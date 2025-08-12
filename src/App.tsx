// Vite + React + TypeScript single-file app
// File: App.tsx
// Usage:
// 1) Create a vite app: `npm create vite@latest my-random-bing -- --template react-ts`
// 2) Replace src/App.tsx with this file.
// 3) `npm install` then `npm run dev`.

import  { useEffect, useRef, useState } from 'react';

const QUERIES: string[] = [
  '今日新闻',
  '深夜食堂 菜谱',
  '随机笑话',
  '前端面试题',
  '机器学习 入门 教程',
  '城市旅游 推荐',
  '好看的科幻小说',
  '编程挑战 leetcode',
  '学 Python 的最佳资源',
  '猫咪 图片',
  '如何做番茄炒蛋',
  '无聊小游戏',
  '最新 科技 动态',
  '随机健身 动作',
  '创意点子 列表',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [query, setQuery] = useState<string>(() => pickRandom(QUERIES));
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);
  const [delayMs, setDelayMs] = useState<number>(600);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!autoRedirect) return;
    const t = setTimeout(() => {
      // Simulate submitting Bing's search form to appear as a real search
      formRef.current?.submit();
    }, delayMs);
    return () => clearTimeout(t);
  }, [query, autoRedirect, delayMs]);

  function reroll() {
    setQuery(pickRandom(QUERIES));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      <div className="max-w-xl w-full text-center p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-semibold mb-4">随机 Bing 查询（新标签页）</h1>
        <p className="mb-6">页面打开后会在短时间内自动提交 Bing 搜索表单。若不想自动跳转，可以关闭自动提交。</p>

        <div className="mb-4">
          <div className="inline-block px-4 py-3 rounded-lg border border-gray-200">
            <strong>查询：</strong>
            <span style={{ marginLeft: 8 }}>{query}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center mb-4">
          <button onClick={reroll} className="px-4 py-2 rounded-lg border">重新生成</button>
          <button onClick={() => formRef.current?.submit()} className="px-4 py-2 rounded-lg border">立即搜索</button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={autoRedirect} onChange={(e) => setAutoRedirect(e.target.checked)} /> 自动提交
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            延迟(ms):
            <input type="number" value={delayMs} onChange={(e) => setDelayMs(Number(e.target.value) || 0)} style={{ width: 90 }} />
          </label>
        </div>

        {/* Hidden Bing search form */}
        <form ref={formRef} action="https://cn.bing.com/search" method="GET" target="_self" style={{ display: 'none' }}>
          <input type="hidden" name="q" value={query} />
          <input type="hidden" name="form" value="ANSPH1" />
          <input type="hidden" name="refig" value="689b5f555e8c42388bdd17b8f121b368" />
          <input type="hidden" name="pc" value="U531" />
        </form>

        <footer className="mt-6 text-xs text-gray-500">提示：把这个页面 URL 设置为浏览器的新标签页或使用扩展覆盖 newtab 即可。</footer>
      </div>
    </div>
  );
}
