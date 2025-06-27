import { useEffect } from "@googleforcreators/react";

function Preview() {
  useEffect(() => {
    const content = window.localStorage.getItem("STORY_MARKUP");

    if (content) {
      document.open();
      // Note that the use of document.write for replacing the whole page is to quickly set up a preview for demo but may not be ideal for production.
      document.write(content);
      document.close();
    }
  }, []);

  return null;
}

export default Preview;
