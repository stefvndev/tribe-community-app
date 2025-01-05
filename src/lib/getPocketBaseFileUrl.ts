type TFile = {
  recordId: string;
  filename: string;
  collectionName: string;
};

export function getPocketBaseFileUrl({
  recordId,
  filename,
  collectionName,
}: TFile): string {
  return `${import.meta.env.VITE_API_BASE_URL}/api/files/${collectionName}/${recordId}/${filename}`;
}
