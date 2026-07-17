const lessons = [
  {
    title: "Meet PowerShell",
    level: "Lesson 1",
    summary: "Understand the shell, cmdlets, verbs, nouns, and the help system.",
    content: `
      <h3>What is PowerShell?</h3>
      <p>PowerShell is a cross-platform command-line shell, scripting language, and automation framework. Unlike text-only shells, it sends rich .NET objects through its pipeline.</p>
      <h3>The Verb-Noun pattern</h3>
      <p>Cmdlets use predictable names such as <code>Get-Process</code>, <code>Stop-Service</code>, and <code>New-Item</code>.</p>
      ${code(`Get-Command -Verb Get\nGet-Help Get-Process -Examples\nGet-Member -InputObject (Get-Date)`)}
      <div class="callout"><strong>Safety:</strong> Read help before running commands that change or remove data. Use <code>-WhatIf</code> when a cmdlet supports it.</div>
      <div class="exercise"><strong>Practice:</strong> Find three commands that use the verb <code>Get</code>. Then display examples for one of them.</div>`,
    question: "Which command displays examples for Get-Process?",
    options: ["Get-Process -Help", "Get-Help Get-Process -Examples", "Show-Examples Get-Process"], answer: 1
  },
  {
    title: "Commands, Parameters, and Discovery", level: "Lesson 2", summary: "Discover commands and use positional, named, switch, and common parameters.",
    content: `<h3>Explore before memorizing</h3><p>Use command discovery to learn interactively. Parameters begin with a dash and can accept values or act as switches.</p>${code(`Get-Command *service*\nGet-Help Get-Service -Full\nGet-Service -Name spooler\nGet-Process -Name pwsh -ErrorAction SilentlyContinue`)}<h3>Useful common parameters</h3><ul><li><code>-Verbose</code> reveals extra operational details.</li><li><code>-ErrorAction</code> controls non-terminating errors.</li><li><code>-WhatIf</code> previews supported changes.</li></ul><div class="exercise"><strong>Practice:</strong> Find commands related to files by searching for <code>*item*</code>.</div>`,
    question: "Which parameter previews a supported change without performing it?", options: ["-Preview", "-WhatIf", "-TestOnly"], answer: 1
  },
  {
    title: "Objects and the Pipeline", level: "Lesson 3", summary: "Pass objects between commands, inspect properties, filter, sort, and select.",
    content: `<h3>Objects, not formatted text</h3><p>The pipeline operator <code>|</code> passes objects from one command to another. Properties remain available until formatting occurs.</p>${code(`Get-Process | Get-Member\nGet-Process | Where-Object CPU -gt 10\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU`)}<div class="callout"><strong>Tip:</strong> Keep <code>Format-Table</code> and <code>Format-List</code> at the end of a pipeline.</div><div class="exercise"><strong>Practice:</strong> List the five largest files in your current folder using <code>Get-ChildItem</code>, <code>Sort-Object</code>, and <code>Select-Object</code>.</div>`,
    question: "Which cmdlet filters pipeline objects?", options: ["Where-Object", "Select-String", "Measure-Object"], answer: 0
  },
  {
    title: "Variables and Data Types", level: "Lesson 4", summary: "Store values, work with arrays and hash tables, and use string interpolation.",
    content: `<h3>Variables</h3><p>Variables begin with <code>$</code>. PowerShell usually infers the data type, but explicit types can improve validation.</p>${code(`$name = "Jordan"\n$count = 3\n$servers = @("server01", "server02")\n$user = @{ Name = "Jordan"; Department = "IT" }\n"Hello $name. Server count: $($servers.Count)"`)}<h3>Single vs. double quotes</h3><p>Double-quoted strings expand variables. Single-quoted strings usually preserve text literally.</p><div class="exercise"><strong>Practice:</strong> Create an array of three computer names and print each name in a sentence.</div>`,
    question: "Which string expands $name?", options: ["'Hello $name'", "\"Hello $name\"", "Both always expand it"], answer: 1
  },
  {
    title: "Logic and Loops", level: "Lesson 5", summary: "Make decisions and repeat work with if, switch, foreach, and while.",
    content: `${code(`$freeGB = 18\nif ($freeGB -lt 20) {\n  Write-Warning "Low disk space"\n} else {\n  Write-Host "Disk space is healthy"\n}\n\nforeach ($name in @("Ada", "Linus", "Grace")) {\n  "Hello, $name"\n}`)}<h3>Comparison operators</h3><p>Common operators include <code>-eq</code>, <code>-ne</code>, <code>-gt</code>, <code>-lt</code>, <code>-like</code>, and <code>-match</code>.</p><div class="exercise"><strong>Practice:</strong> Loop through numbers 1–10 and print only the even values.</div>`,
    question: "Which operator means greater than?", options: ["-gt", ">>", "-more"], answer: 0
  },
  {
    title: "Functions and Scripts", level: "Lesson 6", summary: "Package reusable logic in functions and .ps1 script files.",
    content: `<h3>Create a function</h3>${code(`function Get-Greeting {\n  [CmdletBinding()]\n  param(\n    [Parameter(Mandatory)]\n    [string]$Name\n  )\n  "Hello, $Name!"\n}\n\nGet-Greeting -Name "Sam"`)}<p>Save larger programs with a <code>.ps1</code> extension. Use parameters rather than hard-coded values.</p><div class="callout"><strong>Execution policy:</strong> It is a safety feature, not a complete security boundary. Review scripts and follow your organization’s policy.</div><div class="exercise"><strong>Practice:</strong> Write a function that accepts a path and returns the number of files in it.</div>`,
    question: "What keyword defines function inputs?", options: ["inputs", "param", "arguments"], answer: 1
  },
  {
    title: "Files, CSV, and JSON", level: "Lesson 7", summary: "Automate files and exchange structured data with CSV and JSON.",
    content: `${code(`New-Item -ItemType Directory -Path ./reports -Force\nGet-ChildItem -File | Select-Object Name, Length | Export-Csv ./reports/files.csv -NoTypeInformation\n$data = Import-Csv ./reports/files.csv\n$data | ConvertTo-Json | Set-Content ./reports/files.json`)}<h3>Use Join-Path</h3><p><code>Join-Path</code> is safer and more portable than manually typing path separators.</p><div class="exercise"><strong>Practice:</strong> Export running processes with Name, Id, and CPU to a CSV file, then import it.</div>`,
    question: "Which cmdlet reads a CSV into objects?", options: ["Read-Csv", "ConvertFrom-CsvFile", "Import-Csv"], answer: 2
  },
  {
    title: "Errors and Debugging", level: "Lesson 8", summary: "Handle failures with try/catch/finally and troubleshoot scripts.",
    content: `${code(`try {\n  Get-Content ./missing.txt -ErrorAction Stop\n} catch {\n  Write-Error "Could not read the file: $($_.Exception.Message)"\n} finally {\n  Write-Verbose "Read attempt finished" -Verbose\n}`)}<p><code>try/catch</code> catches terminating errors. Add <code>-ErrorAction Stop</code> when you need a non-terminating cmdlet error to enter the catch block.</p><h3>Debugging tools</h3><p>Use <code>Set-PSBreakpoint</code>, editor breakpoints, <code>Write-Debug</code>, and small testable functions.</p><div class="exercise"><strong>Practice:</strong> Add error handling to a script that imports a CSV file.</div>`,
    question: "Which block runs whether an error occurs or not?", options: ["catch", "finally", "rescue"], answer: 1
  },
  {
    title: "Remoting and REST APIs", level: "Lesson 9", summary: "Run commands remotely and interact with web services responsibly.",
    content: `<h3>PowerShell remoting</h3>${code(`# Run only in an authorized environment\nInvoke-Command -ComputerName Server01 -ScriptBlock { Get-Service }\n\n# Public test API example\n$result = Invoke-RestMethod -Uri "https://jsonplaceholder.typicode.com/todos/1"\n$result.title`)}<div class="callout"><strong>Authorization:</strong> Use remoting only on systems you own or are explicitly authorized to administer. Protect credentials and prefer secure authentication.</div><p><code>Invoke-RestMethod</code> converts common JSON responses into PowerShell objects automatically.</p><div class="exercise"><strong>Practice:</strong> Call a safe public API and inspect the returned object with <code>Get-Member</code>.</div>`,
    question: "Which cmdlet commonly converts JSON API responses into objects?", options: ["Invoke-RestMethod", "Open-WebObject", "Get-ApiData"], answer: 0
  },
  {
    title: "Capstone: System Health Report", level: "Lesson 10", summary: "Build a reusable report that combines processes, disks, services, and exports.",
    content: `<h3>Your project</h3><p>Create <code>Get-SystemHealthReport.ps1</code>. It should collect the current date, operating system, available disk space, top five processes by CPU, and stopped automatic services. Export the report to JSON or HTML.</p>${code(`param([string]$OutputPath = "./system-health.json")\n\n$report = [ordered]@{\n  GeneratedAt = Get-Date\n  ComputerName = $env:COMPUTERNAME\n  TopProcesses = Get-Process |\n    Sort-Object CPU -Descending |\n    Select-Object -First 5 Name, Id, CPU\n}\n\n$report | ConvertTo-Json -Depth 4 | Set-Content $OutputPath\nWrite-Host "Report saved to $OutputPath"`)}<h3>Stretch goals</h3><ul><li>Add parameters and validation.</li><li>Use try/catch and logging.</li><li>Create an HTML report.</li><li>Schedule it using an approved system scheduler.</li></ul><div class="exercise"><strong>Completion check:</strong> Run the script twice, inspect the output, and explain one improvement you would make for production use.</div>`,
    question: "Which format is easiest for another program to parse?", options: ["JSON", "Console colors", "Formatted table text"], answer: 0
  }
];

function code(text) {
  return `<div class="code-block"><button class="copy-button">Copy</button><pre><code>${escapeHtml(text)}</code></pre></div>`;
}
function escapeHtml(value) { return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

const state = JSON.parse(localStorage.getItem('psCourseState') || '{"completed":[],"current":0,"quiz":{}}');
const nav = document.querySelector('#lessonNav');
const container = document.querySelector('#lessonContainer');
const sidebar = document.querySelector('#sidebar');

function save() { localStorage.setItem('psCourseState', JSON.stringify(state)); updateProgress(); }
function updateProgress() {
  const percent = Math.round((state.completed.length / lessons.length) * 100);
  document.querySelector('#progressText').textContent = `${percent}%`;
  document.querySelector('#progressBar').style.width = `${percent}%`;
  renderNav();
}
function renderNav() {
  nav.innerHTML = lessons.map((lesson, i) => `<button class="lesson-link ${state.current===i?'active':''} ${state.completed.includes(i)?'completed':''}" data-index="${i}"><span class="lesson-number">${state.completed.includes(i)?'✓':i+1}</span><span>${lesson.title}</span><span class="lesson-check">${state.completed.includes(i)?'●':''}</span></button>`).join('');
  nav.querySelectorAll('.lesson-link').forEach(btn => btn.addEventListener('click', () => showLesson(Number(btn.dataset.index))));
}
function showLesson(index) {
  state.current = Math.max(0, Math.min(index, lessons.length - 1));
  const l = lessons[state.current];
  container.innerHTML = `<article class="lesson-card"><header class="lesson-header"><span class="eyebrow">${l.level}</span><h2>${l.title}</h2><p>${l.summary}</p></header><div class="lesson-body">${l.content}<section class="quiz"><h3>Knowledge check</h3><p>${l.question}</p>${l.options.map((o,i)=>`<label class="quiz-option"><input type="radio" name="quiz" value="${i}" ${state.quiz[state.current]===i?'checked':''}> ${o}</label>`).join('')}<button class="primary-button check-answer">Check answer</button><p class="quiz-feedback"></p></section></div><footer class="lesson-footer"><button class="previous-button" ${state.current===0?'disabled':''}>← Previous</button><button class="next-button" ${state.current===lessons.length-1?'disabled':''}>Next →</button><button class="complete-button">${state.completed.includes(state.current)?'Completed ✓':'Mark complete'}</button></footer></article>`;
  container.querySelectorAll('.copy-button').forEach(btn => btn.addEventListener('click', async () => { const text = btn.nextElementSibling.innerText; await navigator.clipboard.writeText(text); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1200); }));
  container.querySelector('.check-answer').addEventListener('click', () => {
    const selected = container.querySelector('input[name="quiz"]:checked');
    const feedback = container.querySelector('.quiz-feedback');
    if (!selected) { feedback.textContent='Choose an answer first.'; feedback.className='quiz-feedback incorrect'; return; }
    state.quiz[state.current] = Number(selected.value); save();
    const correct = Number(selected.value) === l.answer;
    feedback.textContent = correct ? 'Correct — well done!' : `Not quite. The correct answer is: ${l.options[l.answer]}`;
    feedback.className = `quiz-feedback ${correct?'correct':'incorrect'}`;
  });
  container.querySelector('.previous-button').addEventListener('click', () => showLesson(state.current - 1));
  container.querySelector('.next-button').addEventListener('click', () => showLesson(state.current + 1));
  container.querySelector('.complete-button').addEventListener('click', () => {
    if (!state.completed.includes(state.current)) state.completed.push(state.current);
    save(); showLesson(state.current);
  });
  save();
  container.scrollIntoView({behavior:'smooth', block:'start'});
  sidebar.classList.remove('open');
}

document.querySelector('#startButton').addEventListener('click', () => showLesson(0));
document.querySelector('#continueButton').addEventListener('click', () => showLesson(state.current));
document.querySelector('#menuButton').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelector('#resetButton').addEventListener('click', () => { if(confirm('Reset all lesson and quiz progress?')) { state.completed=[]; state.current=0; state.quiz={}; save(); showLesson(0); } });

let deferredPrompt;
const installButton = document.querySelector('#installButton');
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt=e; installButton.hidden=false; });
installButton.addEventListener('click', async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installButton.hidden=true; });
window.addEventListener('appinstalled', () => installButton.hidden=true);

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
renderNav(); updateProgress();
