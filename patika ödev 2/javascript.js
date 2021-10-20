
const form = document.querySelector(".form");
const input = document.querySelector("#task");
const addButton = document.querySelector(".button");//değişkenlerş domda tanımladık
const list = document.querySelector("#list");
const removeButton = document.querySelector(".delete-button");


let liste = []; // listeleme için boş bir depolama yeri oluşturduk


const renderDOM = () => {
  list.innerHTML = "";  //listelenen her veriyi tekrar doma işler


  liste.map((listelet) => {
    const li = document.createElement("li"); //listeyi oluştur ve yeni oluşturulan her elemanı listeye ekle

    li.id = listelet.id;
    li.classList =
      "listelet-item d-flex justify-content-between align-items-center";
    li.dataset.checked = listelet.checked;
    li.innerHTML = `
    ${listelet.name}<span class="delete-button btn btn-danger">&times;</span>
    `;

    list.append(li); 
  });
};


const addLocalStorage = (liste) => {
  localStorage.setItem("liste", JSON.stringify(liste));//localstorage güncelle

  renderDOM();
};


const getLocalStorage = () => {   //verileri local storage den alma
  const listelets = JSON.parse(localStorage.getItem("liste"));


  listelets ? (liste = listelets) : (liste = []); //listelenecek veriler varsa alır yoksa hata önlemek için yeni veri oluşturur.

  renderDOM();
};


const addlistelet = (item) => { //bu fonksiyon ile listelete veri eklenirve bunu localstorage ekler

  if (!item) {
    $("#error").toast("show");
    return false;
  } else {
    $("#added").toast("show");
  }

  const listelet = {   //props ile yeni bir nesne yaratma
    id: Date.now(),
    name: item,
    checked: false,
  };

 
  liste.push(listelet);
  addLocalStorage(liste); //listeyi listelete gönder ve localstorage ekle

  input.value = "";  //ekledikten sonre giriş kısmını temizle
};


const togglelistelet = (item) => { 
  liste.map((item) => {
    if (item.checked === false) { //toggle ile seçili olup olmama durmunu gösterip göstermemeyi yaptık
      item.checked = true;
    } else {
      item.checked = false;
    }
  });


  if (!item.className.includes("checked")) {
    item.classList.add("checked");
    item.dataset.checked = true;
  } else {
    item.classList.remove("checked");
    item.dataset.checked = false;
  }
};


const removelistelet = (item) => { //listelet fonksiyonu
  const parent = item.parentElement;
  const id = parent.id;

  liste.filter((listelet) => { //listelet.id ve id eşit değilse filtrele
    if (listelet.id != id) { 
      console.log("hata");
    }
  });

  parent.remove();

  localStorage.setItem("liste", JSON.stringify(liste));
};

// listeyi değiştirmek ve kaldırmak için
list.addEventListener("click", (e) => {
  if (e.target.className.includes("listelet-item")) {
    togglelistelet(e.target);

//eğer listedeki eleman çıkarlımak istenirse butona basınca sil
  } else if (e.target.className.includes("delete-button")) {
    removelistelet(e.target);
  }
});


form.addEventListener("submit", (e) => { //yeni eleman yazılınca butona tıklandığında ekle
  e.preventDefault();
  addlistelet(input.value);
});

getLocalStorage();