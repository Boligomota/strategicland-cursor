#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
MSG="${1:?Uso: ./publica.sh \"mensaje del commit\"}"
git add -A
if git diff --cached --quiet; then
  echo "Sin cambios que publicar."
else
  git commit -m "$MSG"
fi
git pull --rebase
git push
echo "Publicado. Vercel despliega en 1-2 min."
