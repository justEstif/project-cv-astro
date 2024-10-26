const addMoreButton = document.querySelector("button.addMore");
const formElement = document.querySelector("form");

// Function to update school numbers and manage remove buttons
function updateSchoolNumbers() {
  const allDetailsElements = document.querySelectorAll("form details");
  allDetailsElements.forEach((details, index) => {
    const summaryElement = details.querySelector("summary");
    summaryElement.textContent = `School ${index + 1}`;

    // Manage the remove button
    const removeButton = details.querySelector("button.remove");
    if (index === 0) {
      // Remove button from the first details element
      if (removeButton) {
        removeButton.remove();
      }
    } else {
      // Add remove button if not present
      if (!removeButton) {
        const newRemoveButton = document.createElement("button");
        newRemoveButton.type = "button";
        newRemoveButton.className = "remove";
        newRemoveButton.textContent = "Remove";
        newRemoveButton.addEventListener("click", () => {
          // Open the previous details element before removing
          let previousDetails = details.previousElementSibling;
          while (previousDetails && previousDetails.tagName !== "DETAILS") {
            previousDetails = previousDetails.previousElementSibling;
          }

          if (previousDetails) {
            // Close all details elements
            const allDetails = document.querySelectorAll("form details");
            allDetails.forEach((det) => det.removeAttribute("open"));
            previousDetails.setAttribute("open", "");
          } else {
            // If there's no previous, open the next one
            let nextDetails = details.nextElementSibling;
            while (nextDetails && nextDetails.tagName !== "DETAILS") {
              nextDetails = nextDetails.nextElementSibling;
            }
            if (nextDetails) {
              const allDetails = document.querySelectorAll("form details");
              allDetails.forEach((det) => det.removeAttribute("open"));
              nextDetails.setAttribute("open", "");
            }
          }

          details.remove();
          updateSchoolNumbers();
        });
        details.appendChild(newRemoveButton);
      }
    }
  });
}

addMoreButton?.addEventListener("click", (e) => {
  e.preventDefault();
  const allDetailsElements = document.querySelectorAll("details");

  // Close all existing details elements
  allDetailsElements.forEach((details) => {
    details.removeAttribute("open");
  });

  const firstDetailsElement = allDetailsElements[0];
  if (firstDetailsElement) {
    const newDetailsElement = firstDetailsElement.cloneNode(true);
    const inputs = newDetailsElement.querySelectorAll("input");

    inputs.forEach((input) => {
      input.value = "";
    });

    newDetailsElement.setAttribute("open", "");

    // Remove any existing remove button
    const existingRemoveButton =
      newDetailsElement.querySelector("button.remove");
    if (existingRemoveButton) {
      existingRemoveButton.remove();
    }

    // Append the remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      // Open the previous details element before removing
      let previousDetails = newDetailsElement.previousElementSibling;
      while (previousDetails && previousDetails.tagName !== "DETAILS") {
        previousDetails = previousDetails.previousElementSibling;
      }

      if (previousDetails) {
        // Close all details elements
        const allDetails = document.querySelectorAll("form details");
        allDetails.forEach((det) => det.removeAttribute("open"));
        previousDetails.setAttribute("open", "");
      } else {
        // If there's no previous, open the next one
        let nextDetails = newDetailsElement.nextElementSibling;
        while (nextDetails && nextDetails.tagName !== "DETAILS") {
          nextDetails = nextDetails.nextElementSibling;
        }
        if (nextDetails) {
          const allDetails = document.querySelectorAll("form details");
          allDetails.forEach((det) => det.removeAttribute("open"));
          nextDetails.setAttribute("open", "");
        }
      }

      newDetailsElement.remove();
      updateSchoolNumbers();
    });

    newDetailsElement.appendChild(removeButton);

    // Append the new details element before the button group
    formElement.insertBefore(newDetailsElement, addMoreButton.parentElement);

    updateSchoolNumbers();
  }
});

// Initial call to ensure proper setup
updateSchoolNumbers();
