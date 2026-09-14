import type { Meta, StoryObj } from '@storybook/react-vite';
import './foundations.css';

const colors = [
  ['base', '--color-base'],
  ['page background', '--color-bg-base'],
  ['card background', '--color-bg-base-light'],
  ['primary action', '--color-primary'],
  ['primary light', '--color-primary-light'],
  ['accent action', '--color-accent'],
  ['error', '--color-error'],
  ['text', '--color-text-base'],
  ['secondary text', '--color-text-secondary'],
  ['muted text', '--color-text-muted'],
] as const;

const spacing = [
  ['4', '1rem'],
  ['8', '2rem'],
  ['12', '3rem'],
  ['16', '4rem'],
  ['24', '6rem'],
] as const;

const meta = {
  title: 'Shared UI/Foundations',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <section className="foundation-page">
      <header className="foundation-heading">
        <p className="foundation-eyebrow">Design system</p>
        <h1>Color roles</h1>
        <p>Use semantic roles from globals.css; do not add page-specific hex values.</p>
      </header>
      <div className="foundation-color-grid">
        {colors.map(([label, token]) => (
          <article className="foundation-color-card" key={token}>
            <div className="foundation-swatch" style={{ background: `var(${token})` }} />
            <strong>{label}</strong>
            <code>{token}</code>
          </article>
        ))}
      </div>
    </section>
  ),
};

export const Typography: Story = {
  render: () => (
    <section className="foundation-page">
      <header className="foundation-heading">
        <p className="foundation-eyebrow">Foundation</p>
        <h1>Typography</h1>
        <p>Roboto is the shared runtime and Storybook font stack.</p>
      </header>
      <div className="foundation-type-stack">
        <h1>Heading 1 — рабочее место оператора</h1>
        <h2>Heading 2 — состояние заказа</h2>
        <p className="foundation-type-lead">Lead text — подтверждённый адрес входит в зону доставки.</p>
        <p>Body text — поясняющий текст должен оставаться читаемым на светлом фоне.</p>
        <p className="foundation-type-muted">Muted text — вспомогательные сведения и подсказки.</p>
        <span className="foundation-label">LABEL / STATUS</span>
      </div>
    </section>
  ),
};

export const SpacingAndShape: Story = {
  render: () => (
    <section className="foundation-page">
      <header className="foundation-heading">
        <p className="foundation-eyebrow">Foundation</p>
        <h1>Spacing and shape</h1>
        <p>Prefer the shared scale and control geometry before introducing a local value.</p>
      </header>
      <div className="foundation-spacing-list">
        {spacing.map(([name, width]) => (
          <div className="foundation-spacing-row" key={name}>
            <code>space-{name}</code>
            <span className="foundation-spacing-bar" style={{ width }} />
          </div>
        ))}
      </div>
      <div className="foundation-shape-grid">
        <div><span className="foundation-shape radius-sm" /><code>control radius</code></div>
        <div><span className="foundation-shape radius-lg" /><code>card radius</code></div>
        <div><span className="foundation-shape shadow" /><code>card shadow</code></div>
      </div>
    </section>
  ),
};
