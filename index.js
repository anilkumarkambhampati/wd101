
let userform = document.getElementById("user_form");

const retrieve=() =>
{
let entries = localStorage.getItem("user_entries");
if(entries)
{
    entries = JSON.parse(entries);
}
else
{
    entries=[];
}
return entries;
}
let userentry = retrieve();




const display=() =>{ 
const entries = retrieve();



const tableentries=entries.map((entry) =>
{
    const namecell=`<td>${entry.name}</td>`;
    const emailcell=`<td>${entry.email}</td>`;
    const passwordcell=`<td>${entry.password}</td>`;
    const dobcell=`<td>${new Date(entry.dob).toISOString().slice(0,10)}</td>`;
    const accepttermscell=`<td>${entry.acceptterms ? 'true' : 'false'}</td>`;

      const row=`<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${accepttermscell}</tr>`;
       return row;
      userform.reset;
}).join("\n");

/*const table = `<table><tr>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>dob</th>
<th>accepted terms?</th>
</tr>${tableentries} </table>`;

let details=document.getElementById("user_entries");

details.innerHTML = table;*/
}









const saveform=(event) =>
{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptterms=document.getElementById("acceptterms").checked;

    const entry={
        name,
        email,
        password,
        dob,
        acceptterms
    };

    userentry.push(entry);
    localStorage.setItem("user_entries",JSON.stringify(userentry));
    display();
}


userform.addEventListener("submit",saveform);

display();
