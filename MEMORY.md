# Memory: Núcleo em Órbita

O gênero está definido: **RPG narrativo de exploração sci-fi toy**, combinando aventura, puzzles ambientais e action em tempo real. A exploração, os personagens, os diálogos e as decisões conduzem a experiência; os encontros de ação são curtos, legíveis e com propósito narrativo.

O protagonista é a versão toy/biscuit de Charlles e deve preservar rigorosamente o bonequinho 3D canônico da landing page: óculos redondos marrom-escuros, o cabelo original modelado — mais liso/ondulado, sem cachos separados em formato de bolinhas —, pele morena, rosto e moletom carvão. A direção visual do jogo foi aprovada como graphic novel de sinais, mas a identidade do personagem continua bloqueada até uma referência fiel ser validada. Os estudos `player-ref-graphic-novel.png` e `player-ref-final.png` foram rejeitados e não podem ser usados em sprites, atlas ou implementação.

A proposta narrativa é explorar a estação Orbe-9, conhecer MIRA, PONTO e NIX, recuperar memórias e decidir entre restaurar o protocolo antigo ou permitir uma nova configuração do núcleo. A vertical slice terá hub, dois setores exploráveis, núcleo final, três ferramentas (`Lente`, `Pulso`, `Âncora`), três puzzles, um drone, checkpoints, diálogo, uma escolha final e duração aproximada de 15–25 minutos.

A câmera planejada é 3/4 top-down em 2.5D, com oito direções de movimento, layers de parallax e composição de diorama. A engine recomendada é Babylon.js em planos/sprites com profundidade, sem depender de uma pipeline GLB complexa. Phaser continua como alternativa caso a decisão seja por 2D puro.

O visual target `game-assets/reference-approved.png` está aprovado para a direção graphic novel de sinais. Os estudos de player gerados anteriormente estão rejeitados por reinterpretarem incorretamente o cabelo; o alpha tecnicamente limpo não torna a imagem visualmente aprovada. Nenhum novo sprite, atlas, NPC ou asset de personagem deve ser produzido antes de uma nova referência baseada exclusivamente no bonequinho 3D canônico ser validada pelo usuário.

Ainda não existe uma rota `/game`, dependência Babylon ou sistema de gameplay no projeto. A geração de personagens está pausada. O próximo passo correto é alinhar visualmente com o usuário o cabelo fiel ao bonequinho 3D canônico; somente após esse aceite será retomada a pipeline de assets e, depois, a implementação.
