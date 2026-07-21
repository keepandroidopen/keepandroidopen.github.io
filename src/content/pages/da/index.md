---
title: "Keep Android Open"
lang: da
description: "Et forsvar for Android som en fri og åben platform, hvor alle kan udvikle apps."

# localizable sections for the footer text
contact_header: "Kontakt"
contact_email: "E-mail"
site_problems_header: "Problemer"
site_report_issues: "Rapporter problemer med hjemmesiden"
site_disclaimer: "**Ansvarsfraskrivelse:** Denne hjemmeside er et fællesskabsdrevet, ikke-kommercielt initiativ. Den drives udelukkende til informations- og læringsformål."
site_privacy: "**Privatliv:** Denne hjemmeside bruger ingen cookies og foretager hverken sporing eller logning af brugere."
site_copyright: "**Ophavsret:** Ingen. Dette værk er licenseret under"
open_letter_cta: "Læs vores åbne brev mod Android Developer Verification-programmet"
open_letter_header: "Åbent brev"
open_letter_description: "Et åbent brev til at fremme Android som en fri og åben platform."
---

I august 2025 [annoncerede](https://developer.android.com/developer-verification) Google, at det fra 2027 ikke længere vil være muligt at udvikle apps til Android-platformen uden først at registrere sig hos Google.
Denne registrering vil omfatte:

- Betaling af et gebyr til Google
{:.li-list .li-money}
- Accept af Googles vilkår og betingelser
{:.li-list .li-terms}
- Udlevering af gyldig offentlig legitimation
{:.li-list .li-id}
- Upload af dokumentation for udviklerens private signeringsnøgle
{:.li-list .li-signing}
- Oplistning af alle nuværende og fremtidige applikations-identifikationsstrenge
{:.li-list .li-appids}

## Hvad det betyder for dine rettigheder

➤ Du, **forbrugeren**, købte din Android-enhed i tillid til Googles løfte om, at det var en åben computerplatform, hvor du helt selv kunne bestemme, hvilken software du ville køre. Men fra 2027 vil Google – uden dit samtykke – gennemtvinge installationen af en opdatering til dit operativsystem som permanent blokerer denne ret. Dette gør dig fuldstændig afhængig af Googles vurdering af, hvilke apps de tillader at du fremover må "stole på" og dermed installere på din enhed.

➤ Du, **udvikleren**, vil ikke længere kunne udvikle en app og dele den direkte med venner, familie og dit fællesskab, uden først at få Googles godkendelse. Løftet ved Android – og et af de vigtigste argumenter, systemet har brugt for at adskille sig fra iPhone – har altid været dets åbenhed. Men Google mener åbenbart, at de nu har tilstrækkelig kontrol over Android-økosystemet og tilstrækkelig regulatorisk indflydelse til uden videre at kunne opgive dette princip.

➤ Du, **staten**, overlader dine borgeres rettigheder og din egen digitale suverænitet til en virksomhed, der har en historik med at efterkomme udenretslige krav fra autoritære regimer, om at fjerne fuldt lovlige apps som de ikke bryder sig om. Den software, som er afgørende for driften af virksomheder og myndigheder, vil dermed være overladt til en fjern og ukontrollerbar virksomhed, som opererer uden gennemsigtighed og ansvar.


<div class="callout-warning">

### Opdatering: Google har afsløret det "avancerede flow" — det er ikke en løsning

Den 19. marts 2026 [offentliggjorde Google detaljer](https://android-developers.googleblog.com/2026/03/android-developer-verification.html) om den "avancerede flow"-mekanisme beregnet på at "avancerede brugere" kan installere applikationer fra uverificerede udviklere efter nedlåsningen aktiveres. Det foregår sådan:

1. Aktiver [Udvikler-tilstand](https://www.android.com/intl/en_uk/articles/enable-android-developer-settings/) ved at trykke på softwarens byggenummer i _Om Telefonen_ **syv gange**
1. I Indstillinger > System, åbn Udviklingsindstillinger og scroll ned til “Tillad uverificerede pakker.”
1. Aktiver indstillingen og besvar en skræmmedialog ved at bekræfte at du gør dette frivilligt
1. Indtast din enheds oplåsningskode/kodeord
1. Genstart din enhed
1. **Vent 24 timer**
1. Vend tilbage til _uverificerede pakker_-menuen når sikkerhedsforsinkelsen er overstået
1. Genenmgå og bekræft flere yderligere advarsler og vælg enten “Tillad midlertidigt” (syv dage) eller “Tillad ubegrænset.”
1. På den næste skræmmedialog, bekræft at du forstår risikoen.
1. Nu kan du installere uverificerede pakker på enheden ved at vælge "Installer alligevel" i pakkehåndteringen.

Hele dette flow leveres gennem Google Play Services, ikke Android-operativsystemet, hvilket betyder at Google kan ændre, begrænse eller fjerne det til enhver tid uden en operativsystemopdatering og uden brugerens samtykke. Det avancerede flow har endnu ikke været frigivet i Android beta, udvikler eller test-udgaver. På datoen for denne opdatering eksisterer det kun som et blogindlæg og brugerinterface-mockups. Google beder fællesskabet om at acceptere en featureannoncering som tilstrækkelig sikkerhed fem måneder før begrænsningen træder i kraft.

Indtil Google leverer en implementation som kan verificeres uafhængigt forbliver vores standpunkt uændret: **alle** apps fra ikke-registrerede udviklere **vil blive blokeret** når nedlåsningen effektueres i 2027.

</div>


## Sådan kan du hjælpe {#help}

### Udviklere: Modstå og afvis {#developers}

Hvis du er app-udvikler, så _**tilmeld dig ikke**_ early access-programmet, gennemfør ikke identitetsverificering, og accepter ikke invitationer til Android Developer Console. Svar (høfligt) på enhver invitation ved at forklare dine bekymringer og indvendinger.

—— _Det er kun ved udviklernes underkastelse og kapitulation, at Googles overtagelsesplan måske kan lykkes._ ——

Opfordr andre udviklere og organisationer til at afslå registrering. Brug fællesskabsfora, sociale medier og blogindlæg til at sprede budskabet. Tilføj [FreeDroidWarn-biblioteket](https://github.com/woheller69/FreeDroidWarn) til dit projekt for at informere dine brugere. Hvis du driver en hjemmeside, så overvej at [tilføje nedtællingsbanneret](/banner) til toppen af din side.

Hvis du er ansat hos Google eller på anden måde er tilknyttet udviklerverificeringen med samvittigheden i behold, og du har yderligere indsigt i programmet – herunder planlagte tekniske implementeringsdetaljer eller anden relevant information – bedes du kontakte [tips@keepandroidopen.org](mailto:tips@keepandroidopen.org) fra en _ikke-arbejdscomputer_ og en _ikke-gmailkonto_. Dine oplysninger vil blive behandlet strengt fortroligt.

### Alle: Lad din stemme blive hørt {#everyone}

- [Installer F-Droid](https://f-droid.org) på dine Android-enheder. Jo flere brugere der benytter alternative platforme, desto sværere bliver det at udelukke dem.
- Giv Google direkte feedback gennem deres [undersøgelse om kravene til Androids udviklerverificering](https://docs.google.com/forms/d/e/1FAIpQLSfN3UQeNspQsZCO2ITkdzMxv81rJDEGGjO-UIDDY28Rz_GEVA/viewform?pli=1).
- Gør din holdning synlig på sociale medier og blogs – og link samtidig til [https://keepandroidopen.org](https://keepandroidopen.org).
- Kæmp imod falsk opbakning: Hvis du støder på opslag på fællesskabsforumer eller sociale medier, som forsvarer den nye politik (“Ja, men …”), så sig dem imod – og vær ikke bange for at tage stilling.
- Støt projektet ved at [redigere denne hjemmeside](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/content/pages/en/index.md) og tilføje nyttig information.
- [Skriv under på denne underskriftsindsamling på change.org](https://www.change.org/p/stop-google-from-limiting-apk-file-usage/)

### Hjemmeside-ejere: Vis din støtte {#webmasters}

[Tilføj nedtællingsbanneret til din side](/banner) med et enkelt `<script>`-tag — uden eksterne afhængigheder, 20 indbyggede oversættelser samt masser af muligheder for tilpasning.
