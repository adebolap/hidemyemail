"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type FinderOption = {
  id: string;
  name: string;
  description?: string;
  mediaTypes?: Array<"photo" | "video">;
};

type Props = {
  models: FinderOption[];
  scenarios: FinderOption[];
  lighting: FinderOption[];
  outputs: FinderOption[];
  scenarioSlugs: Record<string, string>;
  modelSlugs: Record<string, string>;
  initial?: {
    modelId?: string;
    mediaType?: "photo" | "video";
    scenario?: string;
    lighting?: string;
    outputGoal?: string;
  };
  compact?: boolean;
};

const steps = ["model", "media", "scenario", "lighting", "output"] as const;

export function SettingsFinder({
  models,
  scenarios,
  lighting,
  outputs,
  scenarioSlugs,
  modelSlugs,
  initial,
  compact = false,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [modelId, setModelId] = useState(initial?.modelId ?? "");
  const [mediaType, setMediaType] = useState<"photo" | "video">(
    initial?.mediaType ?? "photo",
  );
  const [scenario, setScenario] = useState(initial?.scenario ?? "");
  const [lightingId, setLightingId] = useState(initial?.lighting ?? "");
  const [outputGoal, setOutputGoal] = useState(initial?.outputGoal ?? "");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      track("finder_started");
      setStarted(true);
    }
  }, [started]);

  const filteredScenarios = useMemo(() => {
    return scenarios.filter((s) => {
      if (!s.mediaTypes?.length) return true;
      return s.mediaTypes.includes(mediaType);
    });
  }, [scenarios, mediaType]);

  function selectModel(id: string) {
    setModelId(id);
    track("model_selected", { modelId: id });
    setStep(1);
  }

  function selectScenario(id: string) {
    setScenario(id);
    track("scenario_selected", { scenario: id });
    setStep(3);
  }

  function canContinue(current: number): boolean {
    if (current === 0) return Boolean(modelId);
    if (current === 1) return Boolean(mediaType);
    if (current === 2) return Boolean(scenario);
    if (current === 3) return Boolean(lightingId);
    if (current === 4) return Boolean(outputGoal);
    return false;
  }

  function submit() {
    if (!modelId || !scenario || !lightingId || !outputGoal) return;
    const modelSlug = modelSlugs[modelId];
    const scenarioSlug = scenarioSlugs[scenario];
    const path = `/iphone/${modelSlug}/${scenarioSlug}?lighting=${lightingId}&output=${outputGoal}&media=${mediaType}`;
    track("finder_completed", {
      modelId,
      scenario,
      lighting: lightingId,
      output: outputGoal,
      media: mediaType,
    });
    router.push(path);
  }

  return (
    <section
      id="finder"
      className={cn("surface p-5 sm:p-8", compact && "p-4 sm:p-5")}
      aria-labelledby="finder-heading"
    >
      <div className="mb-6">
        <p className="eyebrow">Settings finder</p>
        <h2
          id="finder-heading"
          className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Answer five quick questions
        </h2>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Get a shareable setup for your iPhone in under a minute — mode, lens,
          format, and exact steps.
        </p>
      </div>

      <ol className="mb-6 flex flex-wrap gap-2" aria-label="Finder progress">
        {steps.map((name, index) => (
          <li key={name}>
            <button
              type="button"
              className={cn(
                "min-h-11 rounded-full border px-3 text-sm font-medium",
                index === step
                  ? "border-accent bg-accent-soft text-accent"
                  : index < step
                    ? "border-line bg-bg-muted text-ink"
                    : "border-line text-ink-subtle",
              )}
              onClick={() => index <= step && setStep(index)}
              aria-current={index === step ? "step" : undefined}
            >
              {index + 1}. {name}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Which iPhone?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-4 py-3 text-left",
                  modelId === model.id
                    ? "border-accent bg-accent-soft"
                    : "border-line bg-bg-elevated hover:border-accent",
                )}
                onClick={() => selectModel(model.id)}
              >
                {model.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Photo or video?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["photo", "video"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-4 py-3 text-left capitalize",
                  mediaType === type
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent",
                )}
                onClick={() => {
                  setMediaType(type);
                  setStep(2);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">What are you shooting?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {filteredScenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-4 py-3 text-left",
                  scenario === item.id
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent",
                )}
                onClick={() => selectScenario(item.id)}
              >
                <span className="font-medium">{item.name}</span>
                {item.description ? (
                  <span className="mt-1 block text-sm text-ink-muted">
                    {item.description}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Lighting</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {lighting.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-4 py-3 text-left",
                  lightingId === item.id
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent",
                )}
                onClick={() => {
                  setLightingId(item.id);
                  setStep(4);
                }}
              >
                <span className="font-medium">{item.name}</span>
                {item.description ? (
                  <span className="mt-1 block text-sm text-ink-muted">
                    {item.description}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Intended output</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {outputs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "min-h-11 rounded-[var(--radius-sm)] border px-4 py-3 text-left",
                  outputGoal === item.id
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent",
                )}
                onClick={() => setOutputGoal(item.id)}
              >
                <span className="font-medium">{item.name}</span>
                {item.description ? (
                  <span className="mt-1 block text-sm text-ink-muted">
                    {item.description}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        {step < 4 ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canContinue(step)}
            onClick={() => setStep((s) => Math.min(4, s + 1))}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canContinue(4)}
            onClick={submit}
          >
            See my settings
          </button>
        )}
      </div>
    </section>
  );
}
