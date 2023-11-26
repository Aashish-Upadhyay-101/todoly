import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";
import { FormError } from "./form-error";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to fetch images from unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  // tailwind group utility class change the state(triger the hover state) of child when parent is hovered in our case here.

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}>
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              src={image.urls.thumb}
              className="rounded-sm object-cover"
              alt="unsplash image"
            />
            {selectedImageId === image.id && (
              <div className="inset-y-0 w-full h-full absolute bg-black/40 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[8px] truncate text-white hover:underline p-1 bg-black/50">
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>

      <FormError id="image" errors={errors} />
    </div>
  );
}
