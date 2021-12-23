function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
let profileArray = [];
let arrayEducation = [];
let arrayEmails = [];
let arrayExp = [];
let arrayLanguage = [];
let arrayPhoneList = [];
let arrayWebsites = [];
const profile_data = {};

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message === "extension_go") {
    getData();
    sendResponse(profile_data);
  }
}

function getData() {
  let userName = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/section/div[2]/div[2]/div[1]/div[1]/h1"
  );

  if (userName === null || userName === undefined) {
    Object.assign(profile_data, { name: "" });
  } else {
    Object.assign(profile_data, { name: userName.textContent });
  }

  let profilePic = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/section/div[2]/div[1]/div[1]/div/button/img"
  );
  let profilePic_src = profilePic.src;
  if (profilePic_src === null || profilePic_src === undefined) {
    Object.assign(profile_data, { profile_pic: "" });
  } else {
    Object.assign(profile_data, { profile_pic: profilePic_src });
  }

  let location = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/section/div[2]/div[2]/div[2]/span[1]"
  );
  if (location === null || location === undefined) {
    Object.assign(profile_data, { location: "" });
  } else {
    Object.assign(profile_data, {
      location: location.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let about = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/div/div[3]/section/div"
  );
  if (about === null || about === undefined) {
    Object.assign(profile_data, { about: "" });
  } else {
    Object.assign(profile_data, {
      about: about.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let designation = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/section/div[2]/div[2]/div[1]/div[2]"
  );
  if (designation === null || designation === undefined) {
    Object.assign(profile_data, { designation: "" });
  } else {
    Object.assign(profile_data, {
      designation: designation.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let company = getElementByXpath(
    "/html/body/div[6]/div[3]/div/div/div/div/div[3]/div/div/main/div/section/div[2]/div[2]/ul/li[1]/a/h2/div"
  );
  if (company === null || company === undefined) {
    Object.assign(profile_data, { company: "" });
  } else {
    Object.assign(profile_data, {
      company: company.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let experience = document.getElementsByClassName(
    "pv-entity__position-group-pager pv-profile-section__list-item ember-view"
  );
  for (let i = 0; i < experience.length; i++) {
    let experienceStr = experience[i].textContent;

    let ExperienceList = experienceStr.replace(/[\r\n]+/gm, "");
    let experienceList = ExperienceList.trim();

    arrayExp.push(experienceList);
    let ExperienceInfo = Object.assign({}, arrayExp);
    Object.assign(profile_data, { ExperienceInfo: ExperienceInfo });
  }
  let education = document.getElementsByClassName(
    "pv-profile-section__list-item pv-education-entity pv-profile-section__card-item ember-view"
  );
  for (let i = 0; i < education.length; i++) {
    let allEducation = education[i].textContent;
    let EducationList = allEducation.replace(/[\r\n]+/gm, "");
    let educationList = EducationList.trim();

    arrayEducation.push(educationList);
    let educationInfo = Object.assign({}, arrayEducation);
    Object.assign(profile_data, { educationInfo: educationInfo });
  }

  let languages = document.getElementsByClassName(
    "pv-accomplishments-block__summary-list-item"
  );
  for (let i = 0; i < languages.length; i++) {
    let allLanguages = languages[i].textContent;
    let LanguagesList = allLanguages.replace(/[\r\n]+/gm, "");
    let languagesList = LanguagesList.trim();

    arrayLanguage.push(languagesList);
    let languageInfo = Object.assign({}, arrayLanguage);
    Object.assign(profile_data, { languageInfo: languageInfo });
  }

  let profilelink = getElementByXpath(
    "/html/body/div[3]/div/div/div[3]/section/div/div/div/section[1]/div/a"
  );
  if (profilelink === null || profilelink === undefined) {
    Object.assign(profile_data, { name: "" });
  } else {
    Object.assign(profile_data, {
      users_profile: profilelink.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let BDay = getElementByXpath(
    "/html/body/div[3]/div/div/div[3]/section/div/div/div/section[3]/div/span"
  );
  if (BDay === null || BDay === undefined) {
    Object.assign(profile_data, { Birthday: "" });
  } else {
    Object.assign(profile_data, {
      Birthday: BDay.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }
  let Emails = getElementByXpath(
    "/html/body/div[3]/div/div/div[3]/section/div/div/div/section[3]/div/a"
  );

  if (Emails === null || Emails === undefined) {
    Object.assign(profile_data, { Emails: "" });
  } else {
    Object.assign(profile_data, {
      Emails: Emails.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let Websites = getElementByXpath(
    "/html/body/div[3]/div/div/div[3]/section/div/div/div/section[2]/ul/li/div/a"
  );
  if (Websites === null || Websites === undefined) {
    Object.assign(profile_data, { Websites: "" });
  } else {
    Object.assign(profile_data, {
      Websites: Websites.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }

  let phoneNum = getElementByXpath(
    "/html/body/div[3]/div/div/div[3]/section/div/div/div/section[2]/ul/li/span[1]"
  );
  if (phoneNum === null || phoneNum === undefined) {
    Object.assign(profile_data, { phoneNum: "" });
  } else {
    Object.assign(profile_data, {
      phoneNum: phoneNum.textContent.replace(/[\r\n]+/gm, "").trim(),
    });
  }
}
