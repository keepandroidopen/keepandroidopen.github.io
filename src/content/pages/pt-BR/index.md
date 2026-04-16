---
title: "Keep Android Open"
lang: pt-BR
description: "Defendendo o Android como uma plataforma livre e aberta para todos construírem aplicativos."

# localizable sections for the footer text
contact_header: "Contato"
contact_email: "Email"
site_problems_header: "Problemas"
site_report_issues: "Reportar Problemas no Site"
site_disclaimer: "**Atenção:** Este website é uma empreitada comunitária não comercial. Ele está sendo operado com propostas puramente informativas e educacionais."
site_privacy: "**Privacidade:** Este site não utiliza cookies nem faz rastreamento dos usuários ou salva logs de uso."
site_copyright: "**Copyright:** Nenhum. Esse trabalho é marcado como"

open_letter_cta: "Leia nossa carta aberta contra o programa de verificação de desenvolvedores Android"
---

Em Agosto de 2025 o Google [anunciou](https://developer.android.com/developer-verification) que, a partir de setembro de 2026,
não será mais possível desenvolver apps para a plataforma Android
sem primeiro registrar-se de forma centralizada com o Google.
Esse registro envolverá:

- Pagar uma taxa ao Google
{:.li-list .li-money}
- Concordar com os Termos e Condições do Google
{:.li-list .li-terms}
- Fornecer um documento de identificação oficial
{:.li-list .li-id}
- Upload de evidências da chave de assinatura privada do desenvolvedor
{:.li-list .li-signing}
- Listar todos os atuais e futuros identificadores do aplicativo
{:.li-list .li-appids}

## O que isso significa para os seus direitos

➤ Você, **consumidor**, comprou seu dispositivo Android acreditando na promessa do Google de que era uma plataforma de computação aberta e que você poderia executar qualquer software que escolhesse. Em vez disso, a partir de setembro de 2026, eles estarão forçando, sem consentimento, uma atualização em seu sistema operacional que bloqueia irrevogavelmente esse direito e o deixa à mercê do julgamento deles sobre quais softwares você pode confiar.

➤ Você, **criador**, não pode mais desenvolver um aplicativo e compartilhá-lo diretamente com seus amigos, familiares e comunidade sem antes buscar a aprovação da Google. A promessa do Android — e uma vantagem de marketing que a empresa usou para se distinguir do iPhone — sempre foi a de que ele é “aberto“. Mas a Google claramente sente que tem controle suficiente sobre o ecossistema Android, junto com uma captura regulatória adequada, para poder descartar esse princípio com preconceito e impunidade.

➤ Você, **o Estado**, está cedendo os direitos de seus cidadãos e sua própria soberania digital a uma empresa com histórico de cumprir com as demandas extrajudiciais de regimes autoritários para remover aplicativos perfeitamente legais que eles simplesmente não gostam. O software que é crítico para o funcionamento de seus negócios e governos estará à mercê dos caprichos opacos de uma corporação distante e irresponsável.

<div class="callout-warning">

### Atualização: a Google revelou o "fluxo avançado" de instalação e ele não é uma solução

Em 19 de Março de 2026, o Google [publicou detalhes](https://android-developers.googleblog.com/2026/03/android-developer-verification.html) do mecanismo de "fluxo avançado" concebido para permitir aos "usuários avançados" a instalação de aplicativos de desenvolvedores não verificados após o fechamento ter efeito. Ele funciona da seguinte forma:

1. Ative o [Modo Desenvolvedor](https://www.android.com/intl/pt_br/articles/como-ativar-o-modo-desenvolvedor/) clicando no número de compilação do software em _Sobre o telefone_ **sete vezes**
1. Em Configurações > Sistema, entre nas Opções de Desenvolvedor e role até "Permitir Pacotes Não Verificados"
1. Ative a opção e responda a uma tela de alerta confirmando que você não está sendo coagido
1. Insira seu PIN/senha de desbloqueio do dispositivo
1. Reinicie o celular
1. **Aguarde por 24 horas**
1. Retorne ao menu _Pacotes Não Verificados_ ao final do tempo de espera
1. Role para baixo dos alertas adicionais na tela e selecione "Permitir temporariamente" (por sete dias) ou "Permitir indefinidamente"
1. Na próxima tela de alerta, confirme que você entende os riscos
1. Agora você pode instalar pacotes não verificados no dispositivo tocando na opção "Instalar mesmo assim" no gerenciador de pacotes

Todo esse fluxo é fornecido pelo Google Play Services, não pelo sistema Android, o que significa que o Google pode modificá-lo, restringi-lo ou removê-lo a qualquer momento sem uma atualização do sistema e sem o consentimento do usuário. O fluxo avançado ainda não apareceu em nenhuma versão beta, prévia para desenvolvedores ou canary do Android. Na data desta atualização, ele existe apenas como um post de blog e designs de interface. A comunidade está sendo convidada a aceitar um anúncio de produto como uma salvaguarda funcional cinco meses antes de a exigência entrar em vigor.

Até que o Google forneça uma implementação que possa ser verificada de forma independente, nossa posição permanece inalterada: **todos** os aplicativos de desenvolvedores não registrados **serão bloqueados** quando o bloqueio entrar em vigor em setembro de 2026.

</div>

## Como você pode ajudar {#help}

### Desenvolvedores: Resistam e rejeitem {#developers}

Se você é um desenvolvedor de aplicativo, _**não se inscreva**_ no programa de acesso antecipado, faça verificação de identidade, ou aceite um convite para o Android Developer Console. Responda (educadamente) qualquer convite com uma lista de preocupações e objeções.

—— _É somente através do consentimento dos desenvolvedores que o plano de tomada de controle pode ter sucesso._ ——

Desencoraje outros desenvolvedores de aplicativos e organizações a se inscreverem no programa. Use fóruns comunitários, mídias sociais e postagens em blogs para espalhar a mensagem. Inclua a [biblioteca FreeDroidWarn](https://github.com/woheller69/FreeDroidWarn) no seu código para informar os usuários do seu aplicativo.

Se você é um funcionário ou prestador de serviços do Google com consciência boa e possui informações adicionais sobre o programa, incluindo detalhes sobre a implementação técnica planejada ou justificativas adicionais para o programa, entre em contato com [tips@keepandroidopen.org](mailto:tips@keepandroidopen.org) a partir de um computador _que não seja do trabalho_ e de uma conta _que não seja do Gmail_. Suas informações serão mantidas em sigilo absoluto.

### Todos: Faça sua voz ser ouvida {#everyone}

- [Instale a F-Droid](https://f-droid.org) em seus dispositivos Android. Quanto mais gente usando lojas alternativas de aplicativos, mais difícil será de desligá-las.
- Forneça feedback diretamente ao Google usando sua [pesquisa sobre os requisitos de verificação de desenvolvedores do Android](https://docs.google.com/forms/d/e/1FAIpQLSfN3UQeNspQsZCO2ITkdzMxv81rJDEGGjO-UIDDY28Rz_GEVA/viewform?pli=1).
- Faça sua voz ser ouvida nas redes sociais e em posts em blogs, e referencie <https://keepandroidopen.org>
- Combata "astroturfing": quando encontrar posts suspeitos em fóruns de comunidades e nas redes sociais que suportem essa política (“Bem, na verdade...“), desafie-os e não seja tímido.
- Ajude este projeto [editando essa página](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/content/pages/pt-BR/index.md) e adicione mais informações úteis.
- [Assine essa petição em change.org](https://www.change.org/p/stop-google-from-limiting-apk-file-usage)

### Donos de Websites: Mostrem o seu apoio {#webmasters}

[Adicione o banner de contagem regressiva ao seu site](/banner) com uma simples tag `<script>` — sem dependências, 20 localizações integradas, completamente customizável
