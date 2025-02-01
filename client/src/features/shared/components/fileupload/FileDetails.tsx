import { ReactElement } from "react";

type FileDetailsProps = {
  file: File;
};

const FileDetails = ({ file }: FileDetailsProps): ReactElement => {
  return (
    <div>
      <div> Név: {file.name} </div>
      <div> Méret: {(file.size / 1000).toFixed(2)} KB</div>
      <div> Formátum: {file.type} </div>
    </div>
  );
};

export default FileDetails;
