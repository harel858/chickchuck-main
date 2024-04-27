export const onPopupOpen = (args: any) => {
  if (!args?.data?.Guid && args?.type === "QuickInfo") {
    args.cancel = true; // Cancel the opening of the popup
    return; // Exit the function
  }
};
