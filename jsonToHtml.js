/**
 * JSON to HTML library
 * 
 * @author Pierre HUBERT
 */

/**
 * Convert a JSON object into html elements
 * 
 * @param {Object} parentNodeChilds The parent which contains the childs to convert (an object)
 * @param {Object} values Optionnal, fill the template with predefined values
 * @returns {HTMLObject} The processed JSON code
 */
function JSONtoHTML(parentNodeChilds, values){
    //Create variable
    var resultElements = {};

    //Process each element of the array
    for(elemID in parentNodeChilds){

        //Determine object type
        var objType = (parentNodeChilds[elemID].nodeType ? parentNodeChilds[elemID].nodeType : elemID);
        
        //Create object
        var element = document.createElement(objType);
        element.elemID = elemID;

        //Populate it with its informations
        for(fieldName in parentNodeChilds[elemID]){
            if(fieldName == "nodeType"){
                //Do nothing
            }

            //We perform children generation if required
            else if(fieldName == "children"){
                //Call the function to get the element's childs and apply them
                var elemChilds = JSONtoHTML(parentNodeChilds[elemID][fieldName], values);
                for(childID in elemChilds){
                    element.appendChild(elemChilds[childID]);
                }
            }

            //We check if it is innerHTML filling
            else if(fieldName == "innerHTML"){
                element.innerHTML = parentNodeChilds[elemID][fieldName];
            }
            
            //We check if it is auto filling system which is called
            else if (fieldName == "autofill"){
                //Check if required value exists in the data
                if(values){
                    if(values[parentNodeChilds[elemID][fieldName]]){
                        //Then fill field with the value
                        element.innerHTML = values[parentNodeChilds[elemID][fieldName]];
                    }
                }
            }

            //For other input, we use "setAttribute"
            else{
                element.setAttribute(fieldName, parentNodeChilds[elemID][fieldName]);
            }
        }

        //Save element
        resultElements[element.elemID] = element;
    }

    //Return result
    return resultElements;
}