import FileDetails from "@/features/shared/components/fileupload/FileDetails";
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";

type FileUploaderProps = {
  label: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const FileUploader = ({
  label,
  file,
  setFile,
}: FileUploaderProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="flex gap-8 items-centerj">
        <label htmlFor={label}>{label}</label>
        <input type="file" id={label} onChange={handleChange} />
      </div>
      {file && <FileDetails file={file} />}
    </>
  );
};

export default FileUploader;
