# Validação do avatar e scrub

A primeira dobra local agora mostra somente o símbolo verde do usuário no canto superior esquerdo, sem o texto `charlles.dev`. O novo avatar 3D tem acabamento de biscuit/plastilina, óculos, cabelo e traços inspirados no retrato do usuário, olhos fechados e halo dourado sobre fundo espacial.

O novo clipe local é `public/reference/charlles-hero-biscuit.webm`, com 1280×720, VP9, aproximadamente 4 segundos e sem áudio. A implementação usa o progresso contínuo da cena para atualizar `video.currentTime`, em vez de apenas alternar uma classe entre estados. A captura inicial pelo navegador confirmou o primeiro frame escuro com olhos fechados; a rolagem automática do navegador não mudou a posição nessa tentativa, portanto a validação interativa do ponto intermediário deve ser feita com controle programático ou uma rolagem manual adicional.

Na verificação manual com PageDown, a página avançou e o avatar permaneceu com olhos fechados e iluminação escura no trecho intermediário, coerente com a referência antes do clímax. O próximo ponto de verificação deve ser o final da cena, onde o vídeo gerado deve mostrar a abertura dos olhos e a luz azul expandida. A tentativa de ir ao fim ainda exibiu o frame inicial, então a integração precisa tratar explicitamente o evento `loadedmetadata` antes de atribuir `currentTime`; sem isso, o efeito de scroll pode rodar antes de `video.duration` estar disponível.

Após a correção, a suíte determinística passou o teste de scrub: com a cena em 50% do percurso e duração de 4 segundos, `video.currentTime` chega a aproximadamente 2 segundos depois de `loadedmetadata`. A captura do navegador conectado não expõe o valor numérico do vídeo, portanto a validação de posição foi mantida no teste automatizado.
