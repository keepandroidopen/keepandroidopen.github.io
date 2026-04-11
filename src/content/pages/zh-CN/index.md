---
title: "Keep Android Open"
lang: zh-CN
description: "倡导将Android作为一个自由、开放的平台以供大家构建应用程序。"

# localizable sections for the footer text
contact_header: "联系"
contact_email: "电子邮件"
site_problems_header: "问题"
site_report_issues: "报告网站问题"
site_disclaimer: "**免责声明:** 本站是一个由社区推动的非商业性项目。仅用于提供信息与教育目的。"
site_privacy: "**隐私:** 本站不使用cookies，以及用户跟踪或记录"
site_copyright: "**版权:** 公有领域。本网站使用"

open_letter_cta: "阅读我们反对安卓开发者验证计划的公开信"
---

2025年8月，Google [宣布](https://developer.android.google.cn/developer-verification?hl=zh-cn)从明年开始，未先向Google注册，将不再能为Android平台开发应用程序。
包括但不限于：

- 向Google支付费用
{:.li-list .li-money}
- 同意Google的条款及其条件
{:.li-list .li-terms}
- 提供政府的身份证明
{:.li-list .li-id}
- 上传开发者的私人签名密钥证明
{:.li-list .li-signing}
- 列出目前以及将来的应用标识符
{:.li-list .li-appids}

## 这对于你的权利来说意味着什么

➤ 您，作为一名**消费者**，在购买你的Android设备时，你相信Google的承诺———这是一个开放的系统平台，且你可以在其上自由运行你选择的任何软件。然而2026年9月之后，他们会在未经同意的情况下向你的操作系统推送更新，这将不可逆转地剥夺你的这项权利，让你只能听凭他们的花言巧语，来决定哪些软件才值得你信赖。

➤ 您，作为一名**创作者**，在没有事先取得Google的批准下，你不能再开发应用程序并直接与亲朋好友和社区分享。Android的承诺——亦是它过去常用来将自己与iPhone区分开来的营销优势———即永远保持“开放”。但Google自认为凭借其对生态系统的牢牢把控，以及足够的监管能力，现在可以无情地抛弃这一诺言，且不受任何惩罚。

➤ 您，作为一个**国家**, 这是在将公民权利和数字主权割让给一家公司，它遵守着威权政权的法外要求，将那些恰好为其所恶但完全合法的应用予以下架。而那些对企业和政府运营的至关重要的软件将任由一家远在天边，无需担责的企业肆意摆布。

<div class="callout-warning">

### 更新：Google已揭示“高级流程”—这并不是个解决方案

在2026年3月19日，Google公布了在封锁生效之后，针对“高级用户”允许从未经验证的开发者应用安装的“高级流程”机制的[详细信息](https://android-developers.googleblog.com/2026/03/android-developer-verification.html)。它是这样的：

1. 通过点击 _关于手机_ 里的软件版本号**七次**打开[开发者模式](https://developer.android.google.cn/studio/debug/dev-options?hl=zh-cn)
1. 在设置>系统中，打开开发人员选项并下滑到“允许未经验证的软件包”
1. 切换开关并在一个警告界面中答复，确认你没有被胁迫
1. 输入你的设备解锁pin码/密码
1. 重启你的设备
1. **等待24小时**
1. 在安全延长期结束时返回 _未经验证的软件包_ 菜单
1. 继续跳转另外的警告界面的警示并选择“暂时允许”（七天）或“永久允许”
1. 在随后的警告界面中，确认你了解该风险
1. 通过点击软件包管理程序中的“仍然安装”选项，你现在可以在设备上安装未经验证的软件包。

这个完整的流程是通过Google Play服务进行的，而不是Android系统，这意味着不用系统更新和任何用户同意，Google可以随时修改、限制或移除它。高级流程仍然没有出现在任何Android beta、dev预览或canary发行版本。截至这次更新的日期，它仅作为一篇博客文章和UI样板存在。在强制执行生效前的五个月，为了功能性的保障，社区会被要求接受一份产品公告。

直到Google提供一个可独立验证的可行实施方案，我们的观点都保持不变：一旦他们的封锁在2026年九月生效，**所有**来自未注册的开发者的应用**将被封禁**。

</div>

## 你可以如何出一分力 {#help}

### 开发者: 坚决抵制！ {#developers}

如果你是应用开发者，恳请 _**不要注册**_ 抢先体验计划并进行身份验证，又或接受邀请加入Android开发人员控制台。（礼貌地）回绝任何邀请，并列出你的疑虑和异议。

—— _只有在开发商的默许下，他们的邪恶计划才会得逞_ ——

不要建议其他应用程序开发人员还有组织注册该计划。你可以通过论坛、社交媒体和博客文章来传播该信息。可将[FreeDroidWarn library](https://github.com/woheller69/FreeDroidWarn)包含在你的代码来通知你的应用用户。

如果你是一名有心的Google正式员工或合同工，并且对该计划有更多了解，包括计划中的技术实施细节或该计划实施的其他缘由，请通过一台 _非工作_ 设备和 _非 Gmail_ 账户与[tips@keepandroidopen.org](mailto:tips@keepandroidopen.org)联系。你的信息将被严格保密。

### 所有人: 发出自己的声音！ {#everyone}

- 在您的Android设备上[安装F-Droid](https://f-droid.org)。只要越多人使用其他替代的应用市场，就越难将其摒弃。
- 使用[Android 开发者验证要求调查](https://docs.google.com/forms/d/e/1FAIpQLSfN3UQeNspQsZCO2ITkdzMxv81rJDEGGjO-UIDDY28Rz_GEVA/viewform?pli=1)直接向Google反馈意见。
- 在社交媒体和博客文章上发出您的声音，并链接到<https://keepandroidopen.org>
- 对线网络水军：当您在社区论坛和社交媒体上遇到支持该政策的可疑帖子(“其实吧……”)，不妨以理据争，无所顾忌。
- 通过[编辑此页面](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/content/pages/zh-CN/index.md)丰富更多有用的信息来帮助这个项目。
- [签署这份 change.org 请愿书](https://www.change.org/p/stop-google-from-limiting-apk-file-usage)

### 网站所有者：展现出你的支持！ {#webmasters}

用单个`<script>`标签[给你的网站添加倒计时横幅](/banner)  — 无需依赖, 有20个内置的本土化，可高度定制
