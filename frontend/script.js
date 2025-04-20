// Global variable to track how many continuations have been generated
let generationCount = 0;

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for the input field
    const inputField = document.getElementById("topicInput");
    
    if (inputField) {
        inputField.addEventListener("keydown", function(event) {
            // If Enter key is pressed
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission
                
                // If Shift+Enter, continue generation
                if (event.shiftKey) {
                    continueGeneration();
                } else {
                    // Regular Enter, start new generation
                    generationCount = 0;
                    generateDescription();
                }
            }
        });
    }
    
    // Set up the button click handler
    const button = document.querySelector("button");
    if (button) {
        button.addEventListener("click", function() {
            generationCount = 0;
            generateDescription();
        });
    }
});

// Function to generate initial description
function generateDescription() {
    const topic = document.getElementById("topicInput").value.trim();
    
    if (!topic) {
        alert("Please enter a topic!");
        return;
    }
    
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Generating...";
    
    // Make the API call
    fetch(`http://127.0.0.1:8000/generate/?topic=${encodeURIComponent(topic)}&count=${generationCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.description) {
                resultDiv.textContent = data.description;
            } else {
                resultDiv.textContent = "No content generated.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.textContent = "Failed to generate content. Please try again.";
        });
}

// Function to continue generation
function continueGeneration() {
    const topic = document.getElementById("topicInput").value.trim();
    
    if (!topic) {
        alert("Please enter a topic!");
        return;
    }
    
    // Increment count for continuation
    generationCount++;
    
    const resultDiv = document.getElementById("result");
    const existingContent = resultDiv.innerHTML;
    
    // Add loading message
    const loadingDiv = document.createElement("div");
    loadingDiv.textContent = "Generating more...";
    loadingDiv.className = "loading";
    resultDiv.appendChild(loadingDiv);
    
    // Make the API call for continuation
    fetch(`http://127.0.0.1:8000/generate/?topic=${encodeURIComponent(topic)}&count=${generationCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Remove the loading message
            resultDiv.removeChild(loadingDiv);
            
            // Create a separator
            const separator = document.createElement("hr");
            separator.className = "content-separator";
            resultDiv.appendChild(separator);
            
            // Create and append the new content
            const newContent = document.createElement("div");
            newContent.className = "continuation-content";
            newContent.textContent = data.description || "No additional content generated.";
            resultDiv.appendChild(newContent);
        })
        .catch(error => {
            console.error("Error:", error);
            // Remove the loading message
            resultDiv.removeChild(loadingDiv);
            
            // Create a separator
            const separator = document.createElement("hr");
            separator.className = "content-separator";
            resultDiv.appendChild(separator);
            
            // Create and append error message
            const errorMsg = document.createElement("div");
            errorMsg.className = "error-message";
            errorMsg.textContent = "Failed to generate additional content. Please try again.";
            resultDiv.appendChild(errorMsg);
        });
}