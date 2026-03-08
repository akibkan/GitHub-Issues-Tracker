const issuescontainer = document.getElementById("issues-container");
const loadingSpinner = document.getElementById("loading-spinner")

function showLoading(){
        loadingSpinner.classList.remove("hidden");
        issuescontainer.innerHTML = "";
}
function hideLoading(){
    loadingSpinner.classList.add("hidden");
}

let currenTav= "all";
let allIssues = []; 

// filter function
function filterIssues(){
    if(currenTav === "all"){
        filtered = allIssues;
        // return;
    }else{
        filtered = allIssues.filter(issue => issue.status.toLowerCase()=== currenTav);
    }

    const countIssue = document.getElementById("issue-count");
    countIssue.innerText = filtered.length +  " issues";
    displayIssueCard(filtered);
}


    function switchTab(tab){
        const tabs = ["all", "open","closed"];
        currenTav = tab;
        for(const t of tabs){
            const tabName = document.getElementById('tab-'+ t);
            // console.log(tabName);
            
            if(t === tab){
                tabName.classList.add('btn-primary');
                tabName.classList.remove('btn-outline')
            }else{
                tabName.classList.remove('btn-primary');
            }
        }
        filterIssues();
    }


    // load issues card 
    async function loadIssueCard() {
        showLoading()
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        loadingSpinner.classList.add("hidden");
        hideLoading()
        allIssues = data.data; //2
        filterIssues(); //2
        displayIssueCard(data.data);
    };

    function displayIssueCard(issues){
        issuescontainer.innerHTML = "";
        console.log(issues)
        issues.forEach(issue =>{
            
            // High medium and low lojik 
            if(issue.priority === "high"){
            className= 'badge bg-[#FEECEC] text-[#ef4444]'
        }else if(issue.priority === "medium"){
            className="badge bg-[#fff6d1] text-[#f59e0b]"
        }else{
                className="badge bg-[#EEEFF2] text-[#9ca3af]"
            };
            // border color with card 
            const borderColor = issue.status.toLowerCase() ==="open"?
            'border-t-3 border-green-500': 'border-t-3 border-purple-500';
            // console.log(issue);
            const card = document.createElement("div");
            card.className = "card bg-base-100 shadow-sm mt-5";
            card.innerHTML = `
            <div class="card-body shadow ${borderColor}">
                <div class="flex justify-between items-center">
                    <img src="${issue.status.toLowerCase( ) === 'open' ? './assets/Open-Status.png':'./assets/Closed- status .png'}" alt="">
                    <span class=" ${className}">${issue.priority}</span>
                </div>

                    <div class="space-y-5">
                        <h2 class="text-2xl font-bold truncate">${issue.title}
                        </h2>
                        <p class="line-clamp-2 text-[#64748b]">${issue.description}</p>
                        <div>
                            ${issue.labels[0] ? `<div class="badge bg-[#FECACA] p-6"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</div>` : ''}
                            ${issue.labels[1] ? `<div class="badge bg-[#FDE68A] p-6">
                            <img class="bg-[#fde68a] logo" src="./assets/Aperture.png" alt=""> ${issue.labels[1]}
                        </div>` : ''}
                    </div>
                <hr class="opacity-20">
                <div>
                    <p class="text-[#64748b]">${issue.author}</p>
                    <p class="text-[#64748b]">${issue.createdAt}</p>
                </div>
        </div>
    </div>`;
    issuescontainer.appendChild(card);
        })
    }
    


switchTab("all")
loadIssueCard();