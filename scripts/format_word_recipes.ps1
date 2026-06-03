$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Out = Join-Path $Root "recipe-output\formatted-word-recipes"
$DocxDir = Join-Path $Out "docx"
$ImgDir = Join-Path $Out "images"
$HtmlDir = Join-Path $Out "html"
$PdfDir = Join-Path $Out "pdf"
$ManifestPath = Join-Path $Out "manifest.json"

$ChromeCandidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

$Files = @(
  @{ id = "10TRzvMox-iqzfjN9Kl2ZTpjUZ0ybe6qu"; title = "2022年8月レシピ.docx" },
  @{ id = "1w0bQE0NuoTWvxVPyaeQrC74Eb6eVyNt8"; title = "2022年7月春風通信　具たくさんサンラータン麺.docx" },
  @{ id = "1-IkzYYnIHgpxFnVqkVKvyvG61UsUJb4U"; title = "2022年4月春風通信「豆乳と甘酒のプリン～いちごとクコの実ソースがけ～」.docx" },
  @{ id = "1RfDbws15P6CalWGllICARhWKH83t8WAc"; title = "2022年3月レシピ～菜の花チャンプルー～肌トラブル解消.docx" },
  @{ id = "1Hni4zAEX_QP5jWBfPopyHK8oH4sP3oeI"; title = "2022年2月レシピ.いちごとアボカドのクミン和え.docx" },
  @{ id = "1nQ5yORVg_SXXIn4q1Xj8zzBZzCgKn6Ix"; title = "2022年1月レシピかぶと鶏肉の豆乳スープ.docx" },
  @{ id = "1m2WLts-uq2jLwUSz4PXBvEQ13p0A_cho"; title = "2021年11月レシピ「あったかスイートパンプキン」.docx" },
  @{ id = "1bvYaqHdyHpEWWpHvM8DKpjrzwBbCVWUl"; title = "2021年10月春風通信＿体ぽかぽか 鶏団子と野菜のお味噌汁.docx" },
  @{ id = "1ju-WgD_BbEm9yg1yiv2ItJJpvYg0c-wf"; title = "2021年10月レシピ「黒キクラゲ入り蓮根ボール」.docx" },
  @{ id = "1JHcN4XN1gme_tflYazckTwDJRsvVeLUi"; title = "2021年9月レシピ.docx" },
  @{ id = "1tkaGWEYX7Lay7YgRmuhkXQkcHOlQcmx-"; title = "2021年4月春風通信.docx" },
  @{ id = "1Vprx1B-pJs5dbyAANjXcwogUYsI-9c_m"; title = "2021年3月レシピ.docx" },
  @{ id = "1hlSfM1ar5xyp1WGzwaCfgHIuQDIdbG5u"; title = "2021年4月レシピ.docx" },
  @{ id = "1AdA7eR9uuOy1LC8yRFnBr0psK9_IUqOr"; title = "春風さま 2021年2月レシピ.docx" },
  @{ id = "1rkSmyqem78fz9HO1oQdjvKoXD12U3Rdw"; title = "春風さま 2021年1月レシピ.docx" },
  @{ id = "1HEu2QAt6mJHgrW2bIQozAm9rHy2vOH7W"; title = "2020年11月レシピ.docx" },
  @{ id = "1-M7QQnDZT062kj7uLDT4ze9ix6dH_hA2"; title = "2020年8月レシピ.docx" },
  @{ id = "1pX_KAPL3z9ooDB-bbYaXgzuTvzesmZGK"; title = "2020年7月レシピ.docx" },
  @{ id = "14VgR9-Qh-ul3Eel0B7N7Tim9XpWpPUDy"; title = "2020年春風通信7月分レシピ＿トマトとオクラと豚肉の卵炒め.docx" },
  @{ id = "1WklRtM0vbuGkC-FAQHC_AbDFfEqHQp4J"; title = "2020年6月緑茶の甘酒プリン.docx" },
  @{ id = "1yVLG1vslIqHXgFKAzezAAHPJ01sDApo-"; title = "2020年5月レシピ.docx" },
  @{ id = "1r3x5E9cmhXwjWjToAjED87d75cQ6a59R"; title = "2020年4月レシピ.docx" },
  @{ id = "1pPviIz-g-N1asKiSNhLfKPieduv0cofY"; title = "春風さま 2020年1月レシピ.docx" },
  @{ id = "1cBb4hqDu4UqY8wV_sCg81hFBgk4QI20H"; title = "2020年2月レシピ.docx" },
  @{ id = "1T58vq1sqRTiTCR3Xd5QXjUqq7fkhVd81"; title = "2020年春風通信4月分レシピ.docx" },
  @{ id = "11kYv8C0iQusnbHMa5U0DSVpqHbTi4zsx"; title = "2020年3月レシピ.docx" },
  @{ id = "16EO9yoXm_0vLmmvwDVeSuEYjSUoX0F4V"; title = "春風さま 2019年12月レシピ「エビとナッツとレーズンのカレー炊き込みごはん」.docx" },
  @{ id = "1u_1HwUTatVW1DdOxCEH-574Ro_qi_LeQ"; title = "2020年春風通信1月分レシピ「かぼちゃのおしるこ」.docx" },
  @{ id = "1ivHM0WDobj34TIt8esBNghthn-rTMUdW"; title = "2019年10月レシピ「キャロットラぺ」.docx" },
  @{ id = "1Y05_QKnIkQhcydyCUJTH2DDzBUqnC4xP"; title = "2019年春風通信10月分レシピ「肉と野菜の豆乳スープ」.docx" },
  @{ id = "1ubK26yfVPRb7-1WtAGyKhl32gSQbndT7"; title = "2019年9月レシピ「プルプル杏仁豆腐 白ごまソース添え」.docx" }
)

function New-SafeName([string]$Value) {
  $name = $Value -replace "\.docx?$", ""
  $name = $name -replace '[\\/:*?"<>|]', "_"
  $name = $name -replace "\s+", " "
  $name = $name.Trim()
  if ($name.Length -gt 90) { $name = $name.Substring(0, 90) }
  if ([string]::IsNullOrWhiteSpace($name)) { return "recipe" }
  return $name
}

function ConvertTo-HtmlText([string]$Value) {
  return [System.Net.WebUtility]::HtmlEncode($Value)
}

function Get-TitleFromFile([string]$Name) {
  $match = [regex]::Match($Name, "「(.+?)」")
  if ($match.Success) { return $match.Groups[1].Value }
  $cleaned = $Name -replace "\.docx?$", ""
  $cleaned = $cleaned -replace "^\d{4}年\d{1,2}月(?:春風通信)?(?:分)?(?:レシピ|レシピ)?[＿_.～\s-]*", ""
  $cleaned = $cleaned -replace "^春風さま\s*\d{4}年\d{1,2}月(?:レシピ|レシピ)?[＿_.～\s-]*", ""
  $cleaned = $cleaned.Trim("「", "」", " ", "_", "＿", "-", ".", "～")
  if ([string]::IsNullOrWhiteSpace($cleaned)) { return (New-SafeName $Name) }
  return $cleaned
}

function Get-TitleOverride([string]$Name) {
  $map = @{
    "2022年4月春風通信「豆乳と甘酒のプリン～いちごとクコの実ソースがけ～」.docx" = "豆乳と甘酒のプリン いちごとクコの実ソースがけ"
    "2021年4月春風通信.docx" = "いちごの食べるスムージー"
    "春風さま 2021年2月レシピ.docx" = "さつま芋とりんごのヘルシーポタージュ"
    "春風さま 2021年1月レシピ.docx" = "体ポカポカ 鮭と野菜のグラタン"
    "2020年11月レシピ.docx" = "巡りアップの野菜と豚肉のスパイス炒め"
    "2020年春風通信7月分レシピ＿トマトとオクラと豚肉の卵炒め.docx" = "トマトとオクラと豚肉の卵炒め"
    "2020年6月緑茶の甘酒プリン.docx" = "緑茶の甘酒プリン"
    "2020年4月レシピ.docx" = "いちごの蒸しケーキ"
    "春風さま 2020年1月レシピ.docx" = "長芋と卵の雑炊"
    "2020年春風通信4月分レシピ.docx" = "柑橘とセロリの気巡りサラダ"
    "2020年3月レシピ.docx" = "春のデトックスちらし寿司"
    "春風さま 2019年12月レシピ「エビとナッツとレーズンのカレー炊き込みごはん」.docx" = "エビとナッツとレーズンのカレー炊き込みごはん"
    "2020年春風通信1月分レシピ「かぼちゃのおしるこ」.docx" = "かぼちゃのおしるこ"
    "2019年10月レシピ「キャロットラぺ」.docx" = "プルーンとアーモンドのキャロットラペ"
    "2019年春風通信10月分レシピ「肉と野菜の豆乳スープ」.docx" = "鶏肉と野菜の豆乳スープ"
  }
  if ($map.ContainsKey($Name)) { return $map[$Name] }
  return $null
}

function Get-DocxLines([string]$DocxPath) {
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
  try {
    $entry = $zip.GetEntry("word/document.xml")
    $stream = $entry.Open()
    try {
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
      [xml]$xml = $reader.ReadToEnd()
    } finally {
      $stream.Dispose()
    }
  } finally {
    $zip.Dispose()
  }

  $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
  $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
  $paragraphs = $xml.SelectNodes("//w:body/w:p", $ns)
  $lines = New-Object System.Collections.Generic.List[string]
  foreach ($p in $paragraphs) {
    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($node in $p.SelectNodes(".//w:t|.//w:tab|.//w:br", $ns)) {
      if ($node.LocalName -eq "t") {
        $parts.Add($node.InnerText)
      } elseif ($node.LocalName -eq "tab") {
        $parts.Add(" ")
      } elseif ($node.LocalName -eq "br") {
        $parts.Add("`n")
      }
    }
    $text = ($parts -join "")
    foreach ($line in ($text -split "`n")) {
      $clean = ($line -replace "\s+", " ").Trim()
      if ($clean) { $lines.Add($clean) }
    }
  }
  return @($lines)
}

function Save-FirstImage([string]$DocxPath, [string]$BasePath) {
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
  try {
    $media = @($zip.Entries | Where-Object { $_.FullName -like "word/media/*" } | Sort-Object FullName)
    if ($media.Count -eq 0) { return $null }
    $first = $media[0]
    $ext = [System.IO.Path]::GetExtension($first.FullName)
    if (-not $ext) { $ext = ".jpg" }
    $target = "$BasePath$ext"
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($first, $target, $true)
    return [System.IO.Path]::GetFileName($target)
  } finally {
    $zip.Dispose()
  }
}

function Split-RecipeContent([string]$FileTitle, [string[]]$Lines) {
  $overrideTitle = Get-TitleOverride $FileTitle
  $title = $null
  $lead = $null
  $candidates = New-Object System.Collections.Generic.List[string]
  foreach ($line in ($Lines | Select-Object -First 10)) {
    if ($line -match "[【＜\[]?材料") { break }
    $normalized = $line.Trim("☆", "★", "ー", "-", "―", " ")
    if ($normalized.Length -ge 4 -and $normalized.Length -le 42) { $candidates.Add($normalized) }
    if ($line.Contains("肌") -and $line.Length -le 52) { $lead = $line }
  }
  foreach ($line in $candidates) {
    if ($line -match "「|」|～|ー|の|と") { $title = $line.Trim("「", "」") }
  }
  if (-not $title) { $title = Get-TitleFromFile $FileTitle }
  if ($overrideTitle) { $title = $overrideTitle }
  if (-not $lead) {
    foreach ($line in ($Lines | Select-Object -First 6)) {
      if ($line -ne $title -and $line.Length -le 52) { $lead = $line; break }
    }
  }

  $materialIndex = -1
  $methodIndex = -1
  for ($i = 0; $i -lt $Lines.Count; $i++) {
    if ($materialIndex -lt 0 -and $Lines[$i] -match "[【＜\[]?材料") { $materialIndex = $i }
    if ($methodIndex -lt 0 -and $Lines[$i] -match "[【＜\[]?(作り方|下準備)") { $methodIndex = $i }
  }
  if ($materialIndex -lt 0) { $materialIndex = 0 }
  if ($methodIndex -le $materialIndex) { $methodIndex = [Math]::Min($materialIndex + 12, $Lines.Count) }

  $materials = @($Lines[$materialIndex..($methodIndex - 1)] | Where-Object { $_ -ne $title -and $_ -ne $lead } | Select-Object -First 24)
  $steps = @($Lines[$methodIndex..($Lines.Count - 1)] | Where-Object { $_ -ne $title -and $_ -ne $lead } | Select-Object -First 22)
  return @{
    title = $title
    lead = if ($lead) { $lead } else { "" }
    materials = $materials
    steps = $steps
  }
}

function Render-List([string[]]$Lines) {
  $out = New-Object System.Collections.Generic.List[string]
  foreach ($line in $Lines) {
    $escaped = ConvertTo-HtmlText $line
    if ($line -match "^[【＜\[].+[】＞\]]" -or $line.StartsWith("<")) {
      $out.Add("<p class=""section-title"">$escaped</p>")
    } else {
      $out.Add("<p>$escaped</p>")
    }
  }
  return ($out -join "`n")
}

function Render-Steps([string[]]$Lines) {
  $out = New-Object System.Collections.Generic.List[string]
  $index = 1
  foreach ($line in $Lines) {
    if ($line -match "^[【＜\[].+[】＞\]]") {
      $out.Add("<p class=""section-title"">$(ConvertTo-HtmlText $line)</p>")
    } else {
      $clean = ($line -replace "^[①-⑳]|\d+[.)、]?\s*", "").Trim()
      if (-not $clean) { $clean = $line }
      $mark = if ($index -le 20) { [string][char](0x245F + $index) } else { "$index." }
      $out.Add("<li><span>$mark</span><span>$(ConvertTo-HtmlText $clean)</span></li>")
      $index++
    }
  }
  return ($out -join "`n")
}

function New-RecipeHtml($Recipe, [string]$ImageName, [string]$HtmlPath) {
  $title = ConvertTo-HtmlText $Recipe.title
  $lead = ConvertTo-HtmlText $Recipe.lead
  $materials = Render-List $Recipe.materials
  $steps = Render-Steps $Recipe.steps
  if ($ImageName) {
    $photo = "<img class=""photo"" src=""../images/$(ConvertTo-HtmlText $ImageName)"" alt=""$title"">"
  } else {
    $photo = "<div class=""photo placeholder"">写真</div>"
  }
  $content = @"
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>$title</title>
  <style>
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #2f2a25; background: #f2f0ec; font-family: "Yu Gothic", "Yu Mincho", "Meiryo", serif; }
    .page { width: 297mm; height: 210mm; position: relative; overflow: hidden; background: #fff; padding: 20mm 18mm 12mm; }
    .photo { position: absolute; left: 18mm; top: 19mm; width: 130mm; height: 166mm; object-fit: cover; object-position: center; }
    .placeholder { display: grid; place-items: center; background: #f5f0e8; color: #9a8878; border: 1px solid #eadfd4; }
    .content { position: absolute; left: 166mm; top: 20mm; width: 112mm; height: 168mm; font-size: 8.5pt; line-height: 1.68; letter-spacing: 0; }
    .lead { margin: 0 0 3mm; text-align: center; font-size: 8pt; color: #5d544b; line-height: 1.55; }
    h1 { margin: 0 0 6mm; text-align: center; font-size: 14.5pt; font-weight: 500; color: #3f332d; line-height: 1.55; }
    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; align-items: start; }
    .section-title { margin: 0 0 1.5mm; font-size: 8.3pt; font-weight: 700; }
    p { margin: 0 0 1.2mm; }
    .steps { margin: 0; padding: 0; list-style: none; }
    .steps li { display: grid; grid-template-columns: 5.5mm 1fr; gap: 1.2mm; margin-bottom: 1mm; }
    .footer { position: absolute; right: 24mm; bottom: 10mm; font-size: 8pt; font-weight: 700; color: #3e342e; }
  </style>
</head>
<body>
  <main class="page">
    $photo
    <section class="content">
      <p class="lead">$lead</p>
      <h1>☆$title☆</h1>
      <div class="columns">
        <div class="materials">
          $materials
        </div>
        <ol class="steps">
          $steps
        </ol>
      </div>
    </section>
    <footer class="footer">春奈さんのレシピ</footer>
  </main>
</body>
</html>
"@
  Set-Content -LiteralPath $HtmlPath -Value $content -Encoding UTF8
}

foreach ($path in @($Out, $DocxDir, $ImgDir, $HtmlDir, $PdfDir)) {
  New-Item -ItemType Directory -Force -Path $path | Out-Null
}

$Browser = $ChromeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $Browser) { throw "ChromeまたはEdgeが見つかりません。" }

$Records = New-Object System.Collections.Generic.List[object]
for ($i = 0; $i -lt $Files.Count; $i++) {
  $file = $Files[$i]
  $base = "{0:D2}_{1}" -f ($i + 1), (New-SafeName $file.title)
  $docxPath = Join-Path $DocxDir "$base.docx"
  Write-Host ("[{0}/{1}] {2}" -f ($i + 1), $Files.Count, $file.title)
  if (-not (Test-Path -LiteralPath $docxPath) -or (Get-Item -LiteralPath $docxPath).Length -lt 10000) {
    $url = "https://drive.google.com/uc?export=download&id=$($file.id)"
    Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $docxPath
  }
  if ((Get-Item -LiteralPath $docxPath).Length -lt 10000) { throw "DOCXの取得に失敗しました: $($file.title)" }

  $lines = Get-DocxLines $docxPath
  $imageName = Save-FirstImage $docxPath (Join-Path $ImgDir $base)
  $recipe = Split-RecipeContent $file.title $lines
  $htmlPath = Join-Path $HtmlDir "$base.html"
  $pdfPath = Join-Path $PdfDir "$base.pdf"
  New-RecipeHtml $recipe $imageName $htmlPath
  $profile = Join-Path $Out "chrome-profile"
  New-Item -ItemType Directory -Force -Path $profile | Out-Null
  $htmlUri = ([System.Uri](Resolve-Path $htmlPath).Path).AbsoluteUri
  & $Browser --headless --disable-gpu --no-pdf-header-footer "--user-data-dir=$profile" "--print-to-pdf=$pdfPath" $htmlUri | Out-Null
  if (-not (Test-Path -LiteralPath $pdfPath)) { throw "PDF作成に失敗しました: $($file.title)" }

  $Records.Add([pscustomobject]@{
    source_title = $file.title
    drive_id = $file.id
    recipe_title = $recipe.title
    html = $htmlPath
    pdf = $pdfPath
    image = $imageName
    line_count = $lines.Count
  })
}

$Records | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $ManifestPath -Encoding UTF8
Write-Host "done: $($Records.Count) PDFs -> $PdfDir"
