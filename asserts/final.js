const search = document.getElementById('Search');
const overlay = document.getElementById('overlay');
search.addEventListener('click', async () => {
  const destiElement = document.getElementById("destinantion");
  const desti = destiElement.value;
  const dayElement = document.getElementById("days");
  const days = dayElement.value;

  if (!desti || !days) {
    alert("Please fill in both destination and days fields.");
    return;
  }

  if (desti == "london" && days == 3) {
    overlay.classList.add('active');
    setTimeout(() => {
      window.open("london3.html", '_blank');
      overlay.classList.remove('active');
    }, 2000); 
    return;
  }
  

  const url = "https://ai-trip-planner.p.rapidapi.com/?days="+ days +"&destination="+ desti;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '42e97a0d9amsh9505107cef5b249p190d74jsnfa8a4bd8d56b',
      'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
    }
  };

  try {
    console.log("Fetching data...");
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';  
    console.log(url);
    const response = await fetch(url, options);
    console.log(response);
    const jsonData = await response.json();
    console.log(jsonData);

    console.log("Hurrayy! Data received."); 
    overlay.classList.remove('active'); 
    document.body.style.overflow = 'auto';
    const encodedData = encodeURIComponent(JSON.stringify(jsonData));
    window.open(`searchresults.html?data=${encodedData}`, '_blank');

  } catch (error) {
    console.error(error);
  }

});