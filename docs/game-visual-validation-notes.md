# Visual validation notes — Núcleo em Órbita

## Capturas verificadas

A referência canônica confirma a identidade visual do personagem: cabelo escuro com volume contínuo e modelado em grandes seções conectadas, óculos redondos marrom-escuros, pele morena, rosto neutro e moletom escuro.

A captura de produção do Hub confirma que a cena Babylon, a câmera 3/4 e o HUD carregam juntos. O passe editorial melhorou a hierarquia: título Orbe-9, setor, objetivo, sinais, ameaça, Lumen, ferramentas e mensagem possuem tratamentos distintos. O canvas ainda mostra um player geométrico, o que é esperado e deve ser substituído quando o asset aprovado existir.

## Decisão

Não tentar mascarar o player geométrico com arte gerada sem aprovação. A próxima validação visual do personagem precisa comparar a master v2 com o avatar canônico e verificar cabelo contínuo/modelado, óculos, proporções, pose 3/4 e alpha. O runtime só deve consumir uma sequência individual de sprites depois desse gate.

## Pendências visuais

A captura ainda não representa a qualidade final de arte do jogo porque os kits de ambiente, NPCs, drone, props e VFX são procedurais/provisórios. A composição e a gramática visual estão aprovadas como estrutura; os assets de produção devem entrar por setor, começando pelo player e pelo Hub.

## Inspeção da master v2

A master v2 mantém uma forma de cabelo escuro contínua, com grandes volumes conectados e sem cachos individuais em forma de bolinha. Os óculos redondos marrom-escuros permanecem legíveis em todas as poses, a pele e o moletom escuro estão consistentes e as poses cobrem idle, deslocamento, interação com terminal, uso da Lumen e dash.

Ela ainda é uma folha de referência em fundo creme sólido, não um atlas transparente. Portanto, permanece como candidata visual e não como asset final. Antes da integração, será necessário gerar ou recortar estados individuais, remover o fundo com alpha real, padronizar pivô/base, conferir escala e validar cada estado contra o avatar canônico.

## Revisão dos recortes candidatos

A extração determinística confirmou tecnicamente cinco PNGs RGBA com alpha real e dimensões variáveis, mas a inspeção visual do idle ainda mostra áreas claras/halo e resíduos do fundo creme próximos ao contorno. Esses arquivos permanecem **candidatos técnicos rejeitados para runtime**. Eles não devem ser chamados de sprites finais nem usados para mascarar a ausência de arte aprovada.

A correção adequada será uma nova extração/matting validada por pose ou uma geração individual com fundo realmente removível quando a cota estiver disponível. O critério continua sendo: silhueta limpa, contorno preservado, nenhum quadriculado/creme, alpha real e proporções consistentes entre estados.
