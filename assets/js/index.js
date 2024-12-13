const dataUrl = "https://striveschool-api.herokuapp.com/api/product/";

fetch(dataUrl, {
  method: "GET",
  Headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzM4NDkzNDAsImV4cCI6MTczNTA1ODk0MH0.7Xk3XZH2FbTNaTwxK_HokZhPNecfWCx-5wxtSqCZVmw",
  },
})
.then((response)=> {
    if(response.ok){
        return response.json();
    } else {
        throw new Error ("Errore riperimento dati");
    }
})
