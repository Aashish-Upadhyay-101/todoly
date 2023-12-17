import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const increamentAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decreamentAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit?.count < MAX_FREE_BOARDS) {
    return true;
  }

  return false;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
    select: {
      count: true,
    },
  });
  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
