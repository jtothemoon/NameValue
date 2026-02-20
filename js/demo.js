// ===== DEMO =====
const TEAM = [
  { id: 1, name: '한정욱', role: '프론트엔드 개발자', emoji: '\u{1F468}\u200D\u{1F4BB}', years: 3 },
  { id: 2, name: '이창재', role: '앱 개발자', emoji: '\u{1F4F1}', years: 4 },
  { id: 3, name: '최세인', role: '디자이너', emoji: '\u{1F3A8}', years: 2 },
  { id: 4, name: '오창민', role: 'PM/기획', emoji: '\u{1F4CB}', years: 5 },
];
const CRITERIA = [
  { key: 'collaboration', label: '협업 능력', desc: '팀원과 소통하며 함께 일하는 능력' },
  { key: 'reliability', label: '업무 신뢰도', desc: '맡은 일을 책임감 있게 완수하는 정도' },
  { key: 'communication', label: '커뮤니케이션', desc: '명확하고 효과적으로 의사전달하는 능력' },
  { key: 'growth', label: '성장 의지', desc: '스스로 배우고 발전하려는 태도' },
];
const EXISTING_DATA = {
  1: { collaboration: [4,5,4,5,4], reliability: [5,4,5,4,5], communication: [4,4,5,4,4], growth: [5,5,4,5,5] },
  2: { collaboration: [4,3,4,4,3], reliability: [5,5,5,4,5], communication: [3,4,3,4,3], growth: [4,4,5,4,4] },
  3: { collaboration: [5,5,4,5,5], reliability: [4,4,5,4,4], communication: [5,5,5,4,5], growth: [5,4,5,5,5] },
  4: { collaboration: [4,5,5,4,4], reliability: [5,5,4,5,5], communication: [5,4,5,5,5], growth: [3,4,4,3,4] },
};
const KEYWORDS = {
  1: ['문제해결', '꼼꼼함', '코드리뷰'],
  2: ['책임감', '안정성', '디버깅'],
  3: ['소통왕', '창의력', 'UI센스'],
  4: ['리더십', '팀플레이어', '일정관리'],
};

let demoState = { step: 0, member: null, ratings: {}, currentCriterion: 0 };

function goStep(n) {
  demoState.step = n;
  document.getElementById('demoStep0').style.display = n === 0 ? '' : 'none';
  document.getElementById('demoStep1').style.display = n === 1 ? '' : 'none';
  document.getElementById('demoStep2').style.display = n === 2 ? '' : 'none';
  document.getElementById('demoStep3').style.display = n === 3 ? '' : 'none';
  document.getElementById('demoReset').style.display = n > 0 ? '' : 'none';
  const prog = document.getElementById('demoProgress');
  prog.style.display = n > 0 ? '' : 'none';
  for (let i = 1; i <= 3; i++) {
    document.getElementById('prog' + i).className = 'demo-progress-bar' + (n >= i ? ' active' : '');
  }
  if (n === 1) renderStep1();
  if (n === 2) renderStep2();
  if (n === 3) renderStep3();
}

function resetDemo() {
  demoState = { step: 0, member: null, ratings: {}, currentCriterion: 0 };
  goStep(0);
}

function selectMember(id) {
  demoState.member = TEAM.find(m => m.id === id);
  demoState.ratings = {};
  demoState.currentCriterion = 0;
  goStep(2);
}

function rateCriterion(key, value) {
  demoState.ratings[key] = value;
  const idx = CRITERIA.findIndex(c => c.key === key);
  if (idx < CRITERIA.length - 1 && !demoState.ratings[CRITERIA[idx + 1].key]) {
    demoState.currentCriterion = idx + 1;
  }
  renderStep2();
}

function renderStep1() {
  const el = document.getElementById('demoStep1');
  el.innerHTML = `
    <div class="demo-animate">
      <div class="demo-step-badge">
        <div class="demo-step-num">1</div>
        <span class="demo-step-text">평가할 동료를 선택하세요</span>
      </div>
      <div class="demo-member-grid">
        ${TEAM.map(m => `
          <button class="demo-member-btn" onclick="selectMember(${m.id})">
            <div class="demo-member-emoji">${m.emoji}</div>
            <div class="demo-member-name">${m.name}</div>
            <div class="demo-member-role">${m.role}</div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderStep2() {
  const m = demoState.member;
  const allRated = CRITERIA.every(c => demoState.ratings[c.key] > 0);
  const el = document.getElementById('demoStep2');
  el.innerHTML = `
    <div class="demo-animate">
      <div class="demo-step-badge">
        <div class="demo-step-num">2</div>
        <span class="demo-step-text">${m.name}님을 평가해주세요</span>
      </div>
      <p style="color:var(--text-muted);font-size:13px;margin-bottom:24px;margin-left:38px;">익명으로 기록됩니다</p>
      ${CRITERIA.map((c, i) => {
        const rated = demoState.ratings[c.key] || 0;
        const isActive = i === demoState.currentCriterion && !rated;
        const isDimmed = i > demoState.currentCriterion && !rated;
        return `
          <div class="demo-criterion${isActive ? ' active' : ''}${isDimmed ? ' dimmed' : ''}">
            <div class="demo-criterion-top">
              <div>
                <div class="demo-criterion-label">${c.label}</div>
                <div class="demo-criterion-desc">${c.desc}</div>
              </div>
              <div class="demo-stars">
                ${[1,2,3,4,5].map(s => `<button class="demo-star${(rated >= s) ? ' filled' : ''}" onclick="rateCriterion('${c.key}',${s})"></button>`).join('')}
              </div>
            </div>
            ${rated ? '<div class="demo-rated"><i class="fas fa-check" style="margin-right:4px;font-size:10px;"></i> 평가 완료</div>' : ''}
          </div>
        `;
      }).join('')}
      ${allRated ? '<button class="demo-submit-btn" onclick="goStep(3)">평가 제출하고 프로필 확인 &rarr;</button>' : ''}
    </div>
  `;
}

function renderStep3() {
  const m = demoState.member;
  const combined = {};
  CRITERIA.forEach(c => {
    const all = [...EXISTING_DATA[m.id][c.key], demoState.ratings[c.key]];
    combined[c.key] = (all.reduce((a, b) => a + b, 0) / all.length).toFixed(1);
  });
  const overall = (Object.values(combined).reduce((a, b) => a + parseFloat(b), 0) / Object.keys(combined).length).toFixed(1);
  const count = EXISTING_DATA[m.id].collaboration.length + 1;

  const el = document.getElementById('demoStep3');
  el.innerHTML = `
    <div class="demo-animate" style="display:flex;flex-direction:column;align-items:center;">
      <div class="demo-step-badge" style="align-self:flex-start;">
        <div class="demo-step-num">3</div>
        <span class="demo-step-text">생성된 커리어 프로필</span>
      </div>
      <div class="demo-profile">
        <div class="demo-profile-header">
          <div class="demo-profile-emoji">${m.emoji}</div>
          <div class="demo-profile-name">${m.name}</div>
          <div class="demo-profile-role">${m.role} · 경력 ${m.years}년</div>
          <div class="demo-profile-overall">
            <span>종합</span>
            <strong>${overall}</strong>
            <span style="opacity:0.7">/ 5.0</span>
          </div>
        </div>
        <div class="demo-profile-trust">
          <i class="fas fa-lock" style="font-size:11px;"></i>
          팀 전체 익명 평가 ${count}건 기반
        </div>
        ${CRITERIA.map((c, i) => `
          <div class="demo-profile-bar-row">
            <div class="demo-profile-bar-top">
              <span class="demo-profile-bar-label">${c.label}</span>
              <span class="demo-profile-bar-value">${combined[c.key]}</span>
            </div>
            <div class="demo-profile-bar">
              <div class="demo-profile-bar-fill" id="profileBar${i}" style="width:0"></div>
            </div>
          </div>
        `).join('')}
        <div class="demo-profile-keywords" style="margin-top:4px;margin-bottom:16px;">
          <div style="font-size:12px;color:var(--text-muted);font-weight:600;margin-bottom:8px;">TOP 키워드</div>
          <div>${KEYWORDS[m.id].map(k => `<span class="mock-tag">${k}</span>`).join('')}</div>
        </div>
        <div class="demo-profile-note">
          이 프로필은 재직 기간 동안 축적된 동료 평가를 기반으로 자동 생성됩니다.<br>
          이직 시 지원자 동의 하에 채용사가 열람할 수 있습니다.
        </div>
      </div>
      <p class="demo-result-msg">
        방금 남긴 평가가 기존 ${count - 1}건의 평가에 합산되어<br>프로필이 업데이트되었습니다
      </p>
    </div>
  `;
  // Animate bars
  CRITERIA.forEach((c, i) => {
    setTimeout(() => {
      const bar = document.getElementById('profileBar' + i);
      if (bar) bar.style.width = (parseFloat(combined[c.key]) / 5 * 100) + '%';
    }, i * 120);
  });
}
