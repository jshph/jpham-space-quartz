import { QuartzTransformerPlugin } from "../types"
import { PluggableList } from "unified"
import { visit } from "unist-util-visit"


export const Readwise: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  return {
    name: "Readwise",
    markdownPlugins() {
      const plugins: PluggableList = []
      plugins.push(() => {
        return (tree, file) => {
          const isInReadingsFolder = file.path.includes("/readings/");
          if (isInReadingsFolder) {
            visit(tree, "listItem", (node) => {
              if (node.children) {
                visit(node, "text", (textNode) => {
                  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                  if (datePattern.test(textNode.value) || 
                      textNode.value.startsWith("View Highlight") || 
                      textNode.value.startsWith("Location") || 
                      textNode.value === "None" ||
                      textNode.value.trim() === "" ||
                      textNode.value.startsWith("Page")) {
                    textNode.value = ""; // Remove the node value
                  }
                });
              }
            });
          }
        };
      });
      plugins.push(() => {
        return (tree, file) => {
          console.log(file.path)
        }
      })
      return plugins
    },
  }
}