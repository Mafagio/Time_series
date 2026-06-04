#!/bin/bash
# ====================================================================
#  Double-clique ce fichier pour lancer le site de révision.
#  Il démarre un petit serveur local puis ouvre le site dans le navigateur.
#  Laisse cette fenêtre Terminal OUVERTE tant que tu utilises le site.
#  Pour arrêter : ferme la fenêtre, ou appuie sur Ctrl+C.
# ====================================================================
cd "$(dirname "$0")" || exit 1
PORT=8000
# si le port est déjà pris, on en cherche un libre
while lsof -i ":$PORT" >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo ""
echo "  ▶  Site de révision « Séries temporelles »"
echo "  ▶  Serveur démarré sur  http://localhost:$PORT/index.html"
echo "  ▶  Garde cette fenêtre ouverte. Ctrl+C ou fermer = arrêter."
echo ""
# ouvre le navigateur après une courte pause
( sleep 1 ; open "http://localhost:$PORT/index.html" ) &
# démarre le serveur (reste au premier plan -> la fenêtre reste active)
python3 -m http.server "$PORT"
