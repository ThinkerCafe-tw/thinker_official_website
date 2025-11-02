#!/bin/bash

# 人格切換腳本
# 用法: ./switch-persona.sh <persona_name>

PERSONA=$1
PROJECT_ROOT=$(pwd)
CLAUDE_MD="$PROJECT_ROOT/CLAUDE.md"
BACKUP_DIR="$PROJECT_ROOT/.kiro/personas/_backups"

# 建立備份目錄
mkdir -p "$BACKUP_DIR"

if [ -z "$PERSONA" ]; then
  echo "用法: ./switch-persona.sh <persona_name>"
  echo ""
  echo "可用人格:"
  echo "  curator     - 課程內容管理者"
  echo "  default     - 恢復預設模式"
  exit 1
fi

case "$PERSONA" in
  curator)
    echo "🔄 切換至 Curator 人格..."

    # 備份當前 CLAUDE.md
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    cp "$CLAUDE_MD" "$BACKUP_DIR/CLAUDE.md.backup_$TIMESTAMP"
    echo "✅ 已備份當前 CLAUDE.md"

    # 載入 Curator 人格
    CURATOR_PERSONA="$PROJECT_ROOT/.kiro/personas/curator/CLAUDE_CURATOR.md"

    if [ ! -f "$CURATOR_PERSONA" ]; then
      echo "❌ 找不到 Curator 人格檔案: $CURATOR_PERSONA"
      exit 1
    fi

    cp "$CURATOR_PERSONA" "$CLAUDE_MD"
    echo "✅ 已切換至 Curator 人格"
    echo ""
    echo "📋 Curator 模式已啟動"
    echo "   - 課程內容管理"
    echo "   - 定價分析與更新"
    echo "   - 視覺內容優化"
    echo ""
    echo "💡 使用 './switch-persona.sh default' 恢復預設模式"
    ;;

  default)
    echo "🔄 恢復預設模式..."

    # 找最新的備份
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/CLAUDE.md.backup_* 2>/dev/null | head -1)

    if [ -z "$LATEST_BACKUP" ]; then
      echo "❌ 找不到備份檔案"
      exit 1
    fi

    cp "$LATEST_BACKUP" "$CLAUDE_MD"
    echo "✅ 已恢復預設模式"
    ;;

  *)
    echo "❌ 未知的人格: $PERSONA"
    echo "可用選項: curator, default"
    exit 1
    ;;
esac
