---
title: "保持 Android 開放"
lang: zh-TW
description: "提倡 Android 成為自由、開放的平台，讓人人都能在其上開發應用程式。"

# localizable sections for the footer text
contact_header: "聯絡方式"
contact_email: "電子郵件"
site_problems_header: "問題"
site_report_issues: "回報網站問題"
site_disclaimer: "**免責聲明：** 本站是由社群推動的非商業性專案。僅供資訊與教育用途。"
site_privacy: "**隱私權：** 本站不使用 Cookie，也不會追蹤或記錄使用者。"
site_copyright: "**版權：** 公有領域。本網站使用"

open_letter_cta: "閱讀我們反對 Android 開發者驗證計畫的公開信"
open_letter_header: "公開信"
open_letter_description: "倡議 Android 應維持自由、開放平臺的公開信。"
---

2025 年 8 月，Google [宣布](https://developer.android.com/developer-verification?hl=zh-tw)，自 2026 年 9 月起，開發者若未先集中向 Google 註冊，將無法再開發可供 Android 平臺使用的應用程式。這項註冊要求包括：

- 向 Google 繳費
{:.li-list .li-money}
- 同意 Google 的服務條款
{:.li-list .li-terms}
- 提供政府核發的身分證明文件
{:.li-list .li-id}
- 上傳開發者私人簽署金鑰證明
{:.li-list .li-signing}
- 列出目前及未來所有應用程式識別碼
{:.li-list .li-appids}

## 這對你的權利有什麼影響

➤ **對消費者來說，** 當初你購買 Android 裝置，是因為相信 Google 承諾它是開放的運算平台，也相信自己可以選擇要執行哪些軟體。可是 2026 年 9 月起，Google 將在未經同意的情況下，把更新推送到你的作業系統，永久封鎖這項權利，讓你只能仰賴 Google 判斷哪些軟體值得信任。

➤ **對創作者來說，** 如果沒有先取得 Google 允許，你將無法再開發 App 並直接分享給朋友、家人與社群。Android 的承諾，以及它對抗 iPhone 時長期強調的市場優勢，一直都是「開放」。但 Google 顯然認為自己已經牢牢掌握 Android 生態系，也有足夠的監管俘獲空間，因此可以毫無顧忌地拋棄這項原則。

➤ **對國家來說，** 這代表你正在把公民權利與數位主權讓渡給一家公司，而這家公司過去曾多次配合威權政權的法外要求，下架完全合法、只是政權不喜歡的 App。企業與政府運作所仰賴的重要軟體，將任由一家遙遠、不透明且無須負責的企業擺布。

<div class="callout-warning">

### 更新：Google 已揭露「進階流程」，但這不是解決方案 {#clarification}

2026 年 3 月 19 日，Google [公開](https://android-developers.googleblog.com/2026/03/android-developer-verification.html)了「進階流程」機制細節，聲稱要讓「進階使用者」在封鎖生效後，仍可安裝來自未驗證開發者的應用程式。流程如下：

1. 在 _關於手機_ 中點選軟體版本號碼**七次**，啟用[開發人員模式](https://www.android.com/intl/en_uk/articles/enable-android-developer-settings/)
1. 在 [設定] > [系統] 中開啟 [開發人員選項]，往下捲動到「允許未驗證套件」。
1. 開啟切換鈕，並在恐嚇式警告畫面上確認自己沒有遭到脅迫。
1. 輸入裝置解鎖 PIN 碼或密碼。
1. 重新啟動裝置。
1. **等待 24 小時**
1. 安全延遲結束後，回到 _未驗證套件_ 選單。
1. 捲過更多恐嚇式警告畫面，選擇「暫時允許」（7 天）或「永久允許」。
1. 在下一個恐嚇式警告畫面上，確認自己了解相關風險。
1. 現在可以在套件管理員中點選「仍要安裝」，於此裝置安裝未驗證套件。

整個流程都經由 Google Play 服務提供，而不是 Android 作業系統本身。這表示 Google 隨時可以修改、限制或移除它，不需要作業系統更新，也不需要使用者同意。進階流程至今仍未出現在任何 Android beta、開發者預覽版或 canary 版本中。截至這次更新日期，它仍只存在於一篇部落格文章與幾張 UI 設計稿。社群被要求把產品公告當成實際可用的保障，而且距離規定生效只剩五個月。

在 Google 提供已推出、可獨立驗證的實作之前，我們的立場不變：一旦封鎖於 2026 年 9 月生效，來自未註冊開發者的**所有**應用程式**都會遭到封鎖**。

</div>


## 你可以如何協助 {#help}

### 開發者：抵制並拒絕 {#developers}

如果你是應用程式開發者，請 _**不要註冊**_ 搶先體驗計畫、不要驗證身分，也不要接受加入 Android Developer Console 的邀請。請（禮貌地）回覆任何邀請，列出你的疑慮與反對理由。

—— _他們的接管計畫只有在開發者默許與屈服時才可能成功。_ ——

請勸阻其他應用程式開發者與組織註冊這項計畫。請在社群論壇、社群媒體與部落格文章傳播這個訊息。請在程式碼中加入 [FreeDroidWarn 函式庫](https://github.com/woheller69/FreeDroidWarn)，告知 App 使用者。若你管理網站，也可以考慮[在頁面頂端加入倒數計時橫幅](/banner)。

如果你是有良知的 Google 員工或約聘人員，且對這項計畫有更多了解，包括規劃中的技術實作細節或其他內部理由，請使用 _非工作用_ 裝置與 _非 Gmail_ 帳號聯絡 [tips@keepandroidopen.org](mailto:tips@keepandroidopen.org)。我們會嚴格保密你的資訊。

### 所有人：讓大家聽見你的聲音 {#everyone}

- 在你的 Android 裝置上[安裝 F-Droid](https://f-droid.org)。越多人使用替代 App 市集，就越難把它們排除在外。
- 使用 Google 的 [Android 開發者驗證要求問卷](https://docs.google.com/forms/d/e/1FAIpQLSfN3UQeNspQsZCO2ITkdzMxv81rJDEGGjO-UIDDY28Rz_GEVA/viewform?pli=1)，直接向 Google 提供意見。
- 在社群媒體與部落格文章發聲，並連結至 <https://keepandroidopen.org>
- 對抗假草根宣傳：在社群論壇與社群媒體看到可疑貼文贊同這項政策（滿口「其實……」）時，請提出質疑，不用退縮。
- 藉由[編輯此頁面](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/content/pages/zh-TW/index.md)，協助這個專案補充更多有用資訊。
- [連署這份 change.org 請願書](https://www.change.org/p/stop-google-from-limiting-apk-file-usage/)

### 網站擁有者：表達支持 {#webmasters}

[將倒數計時橫幅加入你的網站](/banner)，只需一個 `<script>` 標籤，沒有相依套件，內建 20 種在地化語言，也可完全自訂。
