axios.defaults.baseURL = 'https://my-portfolio-1-sdwu.onrender.com';


var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function openTab(tabName){
    
    for(tabLink of tabLinks){
        tabLink.classList.remove("active-link");
    }
    for(tabContent of tabContents){
        tabContent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
}


var sideMenu = document.getElementById('sidemenu');

function openMenu(){
    sideMenu.style.right = '0';
}
function closeMenu(){
    sideMenu.style.right = '-200px';
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbyeB6Yu2O2boRL5i7zFVz7EzpajMDLtZt_LD26lGi4Q6q88bQJJY1ogsIAVRJg34gzT/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = 'Message sent successfully';
        setTimeout(function(){
            msg.innerHTML = "";
        }, 5000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message))
})




const getData = async (apiUrl, requestedData) => {

    try {
        const response = await axios.post(apiUrl, requestedData);
        return response.data;

    } catch (error) {
        console.error('Error:', error);
    }
}


const skillItems = document.getElementsByClassName("skill-item");

for(skillItem of skillItems){
    const value = skillItem.getElementsByClassName('skill-description')[0].getElementsByTagName('p')[0].innerText;
    skillItem.getElementsByClassName('skill-fill-bar')[0].style.width = value;
}


// ------------------------------------ GFG --------------------------------------------------------

const RenderGFGData = async() => {


    // const response = await getData('/proxy',{api: 'https://www.geeksforgeeks.org/gfg-assets/_next/data/ZakNYfjR6KsLwkgdllTPT/user/shreyansh_kumar_sahu.json', method: "GET"});


    // const gfgSolvedProblems = response.pageProps.userInfo.total_problems_solved;
    // const gfgCodingScore = response.pageProps.userInfo.score;
    // const gfgStreak = response.pageProps.userInfo.pod_solved_longest_streak;
    // const gfgInstituteRank = response.pageProps.userInfo.institute_rank;

    const response = await getData('/proxy',{api: 'https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=shreyansh_kumar_sahu&article_count=false&redirect=true', method: "GET"});


    const gfgSolvedProblems = response.data.total_problems_solved;
    const gfgCodingScore = response.data.score;
    const gfgStreak = response.data.pod_solved_longest_streak;
    const gfgInstituteRank = response.data.institute_rank;
    
    document.getElementById("gfg_solved_problems").innerText = gfgSolvedProblems;
    document.getElementById("gfg_coding_score").innerText = gfgCodingScore;
    document.getElementById("gfg_streak").innerText = gfgStreak;
    document.getElementById("gfg_institute_rank").innerText = gfgInstituteRank;
}

RenderGFGData();


// -------------------------------- Leetcode API ---------------------------------------------


const RenderLeetcodeData = async() => {

    const api = 'https://leetcode.com/graphql/'

    let response1 = await getData( '/proxy' ,{api, query: {"query":"\n    query userProfileUserQuestionProgressV2($userSlug: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n }\n  }\n}\n    ","variables":{"userSlug":"ShreyanshLander"},"operationName":"userProfileUserQuestionProgressV2"}, method: 'POST'});
    
    const response2 = await getData( '/proxy', {api, query: {"query":"\n    query userContestRankingInfo($username: String!) {\n  userContestRanking(username: $username) {\n    rating\n    globalRanking\n    topPercentage\n    badge {\n      name\n    }\n  }\n  userContestRankingHistory(username: $username) {\n    rating\n     }\n}\n    ","variables":{"username":"ShreyanshLander"},"operationName":"userContestRankingInfo"}, method: 'POST'});
    

    const response3 = await getData( '/proxy', {api, query: {"query":"\n    query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n     streak\n       }\n  }\n}\n    ","variables":{"username":"ShreyanshLander","year":2023},"operationName":"userProfileCalendar"}, method: 'POST'});
    
    const leetcodeLevel = response2.data.userContestRanking.badge.name;
    
    let leetcodeSolvedProblems = 0;
    for(ques of response1.data.userProfileUserQuestionProgressV2.numAcceptedQuestions){
        leetcodeSolvedProblems += ques.count;
    }
    

    let leetcodeMaxRating = 0;

    for(ratings of response2.data.userContestRankingHistory){
        leetcodeMaxRating = Math.max(leetcodeMaxRating, Math.round(ratings.rating));
    }
    
    const leetcodeCurrRating = Math.round(response2.data.userContestRanking.rating);
    const leetcodeStreak = response3.data.matchedUser.userCalendar.streak;
    const leetcodeGlobalRanking = response2.data.userContestRanking.globalRanking;
    const leetcodeTop = response2.data.userContestRanking.topPercentage + '%';
    
    document.getElementById("leetcode_solved_problems").innerText = leetcodeSolvedProblems;
    document.getElementById("leetcode_max_rating").innerText = leetcodeMaxRating;
    document.getElementById("leetcode_curr_rating").innerText = leetcodeCurrRating;
    document.getElementById("leetcode_streak").innerText = leetcodeStreak;
    document.getElementById("leetcode_level").innerText = leetcodeLevel;
    document.getElementById("leetcode_global_ranking").innerText = leetcodeGlobalRanking;
    document.getElementById("leetcode_top").innerText = leetcodeTop;
    


}    

RenderLeetcodeData()

// -------------------------------------------- CodeChef -----------------------------------------


const RenderCodechefData = async () => {

    const response = await getData('/proxy', {api: 'https://codechef-api.vercel.app/handle/shreyansh_5ahu' ,method: 'GET'})
    
    // const codechefSolvedProblems = response.;
    const codechefLevel = response.stars;
    const codechefMaxRating = response.highestRating;
    const codechefCurrRating = response.currentRating;
    const codechefCountryRanking = response.countryRank;
    const codechefGlobalRanking = response.globalRank;
    
    
    // document.getElementById("codechef_solved_problems").innerText = codechefSolvedProblems;
    document.getElementById("codechef_level").innerText = codechefLevel;
    document.getElementById("codechef_max_rating").innerText = codechefMaxRating;
    document.getElementById("codechef_curr_rating").innerText = codechefCurrRating;
    document.getElementById("codechef_country_ranking").innerText = codechefCountryRanking;
    document.getElementById("codechef_global_ranking").innerText = codechefGlobalRanking;
}

RenderCodechefData();



// ------------------------------------------- Codeforces --------------------------------------------------


const RenderCodeforcesData = async() => {

    const response = await getData('/proxy', {api: 'https://codeforces.com/api/user.info?handles=shreyansh_kumar;Fefer_Ivan&checkHistoricHandles=false' ,method: 'GET'})
    
    
    // const codeforcesSolvedProblems = await getData();
    const codeforcesMaxRating = response.result[0].maxRating;
    const codeforcesCurrRating = response.result[0].rating;
    // const codeforcesGlobalRanking = await getData();
    const codeforcesCurrLevel = response.result[0].rank;
    const codeforcesMaxLevel = response.result[0].maxRank;
    
    // document.getElementById("codeforces_solved_problems").innerText = codeforcesSolvedProblems;
    document.getElementById("codeforces_max_rating").innerText = codeforcesMaxRating;
    document.getElementById("codeforces_curr_rating").innerText = codeforcesCurrRating;
    // document.getElementById("codeforces_global_ranking").innerText = codeforcesGlobalRanking;
    document.getElementById("codeforces_max_level").innerText = codeforcesMaxLevel;
    document.getElementById("codeforces_curr_level").innerText = codeforcesCurrLevel;
}

RenderCodeforcesData();


