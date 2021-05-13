import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.promises.unlink(filename);
};
