import CodeSnippetDialog from "../code-snippet-dialog";
import { ModelPicker } from "../model-picker";
import FineTuneImage from "./finetune-image";
import ImageGenerationPrompt from "./image-prompt";
import Images from "./images";

const ImageContainer = () => {
  return (
    <>
      <ImageGenerationPrompt />
      <Images />
      <div>
        <FineTuneImage />
        <CodeSnippetDialog from="image" />
      </div>
    </>
  );
};

export default ImageContainer;
