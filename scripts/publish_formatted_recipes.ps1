$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$SourceManifest = Join-Path $Root "recipe-output\formatted-word-recipes\manifest.json"
$SourcePdfDir = Join-Path $Root "recipe-output\formatted-word-recipes\pdf"
$PublicDir = Join-Path $Root "assets\recipes\formatted"
$CsvPath = Join-Path $Root "recipe-output\formatted-word-recipes\formatted-recipes-for-sheet.csv"
$JsonPath = Join-Path $Root "recipe-output\formatted-word-recipes\formatted-recipes-public.json"
$BaseUrl = "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted"

function Get-Season([string]$SourceTitle) {
  if ($SourceTitle -match "(\d{1,2})月") {
    $month = [int]$Matches[1]
    if ($month -in 3,4,5) { return @("spring", "春") }
    if ($month -in 6,7,8) { return @("summer", "夏") }
    if ($month -in 9,10,11) { return @("autumn", "秋") }
    return @("winter", "冬")
  }
  return @("spring", "春")
}

function Get-Tags([string]$Title, [string]$Season) {
  $tags = New-Object System.Collections.Generic.List[string]
  if ($Season -eq "春") {
    $tags.Add("春")
    $tags.Add("デトックス")
    $tags.Add("ゆらぎ")
  } elseif ($Season -eq "夏") {
    $tags.Add("夏")
    $tags.Add("紫外線")
    $tags.Add("うるおい")
  } elseif ($Season -eq "秋") {
    $tags.Add("秋")
    $tags.Add("乾燥")
    $tags.Add("巡り")
  } else {
    $tags.Add("冬")
    $tags.Add("冷え")
    $tags.Add("乾燥")
  }

  if ($Title -match "豆乳|甘酒|プリン|スムージー|おしるこ|ケーキ|ムース|デザート|パンプキン") {
    $tags.Add("スイーツ")
    $tags.Add("うるおい")
  }
  if ($Title -match "スープ|雑炊|味噌汁|グラタン|ポタージュ|おしるこ") {
    $tags.Add("温活")
  }
  if ($Title -match "チャーハン|ごはん|ちらし寿司|麺|サンラータン") {
    $tags.Add("主食")
  }
  if ($Title -match "サラダ|ラペ|和え|チャンプルー|炒め|ボール") {
    $tags.Add("野菜")
  }
  return ($tags | Select-Object -Unique) -join "、"
}

function Get-Description([string]$Title, [string]$Season) {
  return "${Season}の季節に合わせた、春奈さんのレシピ「$Title」です。"
}

New-Item -ItemType Directory -Force -Path $PublicDir | Out-Null
$records = Get-Content -LiteralPath $SourceManifest -Raw -Encoding UTF8 | ConvertFrom-Json
$rows = New-Object System.Collections.Generic.List[object]

for ($i = 0; $i -lt $records.Count; $i++) {
  $record = $records[$i]
  $seasonInfo = Get-Season $record.source_title
  $seasonKey = $seasonInfo[0]
  $seasonLabel = $seasonInfo[1]
  $publicName = "{0:D2}.pdf" -f ($i + 1)
  $sourcePdf = Join-Path $SourcePdfDir ([System.IO.Path]::GetFileName($record.pdf))
  $targetPdf = Join-Path $PublicDir $publicName
  Copy-Item -LiteralPath $sourcePdf -Destination $targetPdf -Force
  $url = "$BaseUrl/$publicName"
  $tags = Get-Tags $record.recipe_title $seasonLabel
  $rows.Add([pscustomobject]@{
    "レシピ名" = $record.recipe_title
    "季節" = $seasonLabel
    "肌タイプ・タグ" = $tags
    "説明文" = Get-Description $record.recipe_title $seasonLabel
    "レシピURL" = $url
    "写真URL" = $url
    "公開/非公開" = "公開"
    "表示優先度" = 100 + $i
    "メモ" = "Word形式から統一PDF化。元ファイル: $($record.source_title)"
  })
}

$rows | Export-Csv -LiteralPath $CsvPath -NoTypeInformation -Encoding UTF8
$rows | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $JsonPath -Encoding UTF8
Write-Host "copied PDFs: $($rows.Count) -> $PublicDir"
Write-Host "csv: $CsvPath"
Write-Host "json: $JsonPath"
