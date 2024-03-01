
const ajaxHelp = (fetchEndpoint, callback) =>{


    let xmlhttp;

    if (window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", fetchEndpoint, false);
      xmlhttp.send(null);

    }
    else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttp.open("GET", fetchEndpoint, false);
      xmlhttp.send();
    }

    if (xmlhttp.status === 200) {
     

      try {
          const response = JSON.parse(xmlhttp.responseText);
          callback(response);
      } catch (error) {
          console.error("Error parsing JSON:", error);
          
          callback({ error: "Invalid JSON response" });
      }
  } else {
      
      console.error("HTTP error:", xmlhttp.status);
      callback({ error: "HTTP error" });
  }
 
}
  
export default ajaxHelp;

