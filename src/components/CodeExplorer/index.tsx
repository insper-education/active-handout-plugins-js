import React, { useCallback, useEffect, useState } from "react";
import { isNullOrUndefined } from "../../jsutils";
import { CodeViewer } from "../CodeViewer";
import {
  CodeContainer,
  CodeTitle,
  ExplorerContainer,
  ExplorerNavigation,
  FileList,
  Filename,
} from "./styles";

interface ICodeExplorerProps {
  files: { [filename: string]: string };
}

function CodeExplorer({ files }: ICodeExplorerProps) {
  const [selectedFilename, setSelectedFilename] = useState<string>("");
  const [filenames, setFilenames] = useState<string[]>([]);

  useEffect(() => {
    const newFilenames = Object.keys(files).sort();
    setFilenames(newFilenames);
    if (!selectedFilename || !files[selectedFilename])
      setSelectedFilename(newFilenames?.[0] || "");
  }, [files]);

  const makeHandleSelectFilename = (filename: string) => {
    return () => {
      setSelectedFilename(filename);
    };
  };

  return (
    <ExplorerContainer>
      <ExplorerNavigation>
        <FileList>
          {filenames.map((filename) => (
            <Filename
              selected={filename === selectedFilename}
              key={`filename--${filename}`}
              onClick={makeHandleSelectFilename(filename)}
            >
              {filename}
            </Filename>
          ))}
        </FileList>
      </ExplorerNavigation>
      <CodeContainer>
        <CodeTitle>{selectedFilename}</CodeTitle>
        {!isNullOrUndefined(files[selectedFilename]) && (
          <CodeViewer>{files[selectedFilename]}</CodeViewer>
        )}
      </CodeContainer>
    </ExplorerContainer>
  );
}

export default CodeExplorer;
