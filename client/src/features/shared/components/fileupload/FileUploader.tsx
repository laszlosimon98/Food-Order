import { useUploadFileMutation } from "@/features/food/api/foodApi";
import Button from "@/features/shared/components/Button";
import FileDetails from "@/features/shared/components/fileupload/FileDetails";
import { ChangeEvent, ReactElement, useState } from "react";

type FileUploaderProps = {
  id: number;
};

const FileUploader = ({ id }: FileUploaderProps): ReactElement => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [useUploadFile, { isSuccess, error }] = useUploadFileMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const result = await useUploadFile({ id, file });

    if (result.error) {
      setMessage("Fájl feltölés sikertelen!");
    }
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {file && <FileDetails file={file} />}

      {error && <p className="text-red-500">{message}</p>}
      {isSuccess && <p className="text-green-500">Sikeres fájl feltöltés!</p>}

      {file && <Button onClick={handleFileUpload}>Feltöltés</Button>}
    </>
  );
};

export default FileUploader;
