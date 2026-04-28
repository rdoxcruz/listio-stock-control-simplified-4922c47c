<?php
// save-meta.php
// Recebe metadados do artigo após upload FTP e atualiza o posts-XX.json
// Coloque na raiz do site na Hostinger

// ── CONFIGURAÇÃO ──────────────────────────────────────────────
define('SECRET_KEY', 'listio2026xK9mRpQv');

$POSTS_FILES = [
    'pt' => __DIR__ . '/posts-pt.json',
    'en' => __DIR__ . '/posts-en.json',
    'es' => __DIR__ . '/posts-es.json',
];

$BASE_URLS = [
    'pt' => 'https://listio.com.br/blog/',
    'en' => 'https://listio.com.br/en/blog/',
    'es' => 'https://listio.com.br/es/blog/',
];
// ──────────────────────────────────────────────────────────────

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$key = $_SERVER['HTTP_X_SECRET_KEY'] ?? '';
if ($key !== SECRET_KEY) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// Determina idioma
$lang = strtolower(trim($data['lang'] ?? 'pt'));
if (!array_key_exists($lang, $POSTS_FILES)) {
    http_response_code(400);
    echo json_encode(['error' => 'lang deve ser pt, en ou es']);
    exit;
}

$postsFile = $POSTS_FILES[$lang];
$baseUrl   = $BASE_URLS[$lang];

// Campos obrigatórios
$slug    = trim($data['slug']    ?? '');
$titulo  = trim($data['titulo']  ?? '');
$resumo  = trim($data['resumo']  ?? '');

if (!$slug || !$titulo) {
    http_response_code(400);
    echo json_encode(['error' => 'slug e titulo sao obrigatorios']);
    exit;
}

// Carrega posts existentes
$posts = [];
if (file_exists($postsFile)) {
    $json  = file_get_contents($postsFile);
    $posts = json_decode($json, true) ?? [];
}

// Verifica se slug já existe — evita duplicatas
$slugsExistentes = array_column($posts, 'slug');
if (in_array($slug, $slugsExistentes)) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'info'    => 'slug ja existe, ignorado',
        'slug'    => $slug,
    ]);
    exit;
}

// Monta o novo metadado
$novoPost = [
    'id'           => uniqid('post_', true),
    'slug'         => $slug,
    'titulo'       => $titulo,
    'resumo'       => $resumo,
    'imagem'       => trim($data['imagem']   ?? ''),
    'categoria'    => trim($data['categoria'] ?? ''),
    'autor'        => trim($data['autor']    ?? ''),
    'publicado_em' => trim($data['publicado_em'] ?? date('c')),
    'url'          => $baseUrl . $slug . '/',
    'ativo'        => true,
];

// Insere no início (mais recente primeiro)
array_unshift($posts, $novoPost);

if (file_put_contents($postsFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao salvar arquivo']);
    exit;
}

http_response_code(201);
echo json_encode([
    'success' => true,
    'slug'    => $slug,
    'url'     => $baseUrl . $slug . '/',
]);