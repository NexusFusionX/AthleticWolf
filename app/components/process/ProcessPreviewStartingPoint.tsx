import Image from "next/image";
import { Buildings, Check, House } from "@phosphor-icons/react";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

export function ProcessPreviewGender() {
  return (
    <ProcessMiniScreen
      eyebrow="Athletic Wolf"
      title="Set up an individual plan"
    >
      <p className="process-mini-q">Based on your gender</p>
      <div className="process-mini-gender">
        <div className="process-mini-gender__card process-mini-gender__card--selected">
          <div className="process-mini-gender__visual">
            <Image
              src="/media/process/gender-male.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 40vw, 180px"
              className="process-mini-gender__image"
              priority
            />
          </div>
          <div className="process-mini-gender__meta">
            <span className="process-mini-gender__dot" aria-hidden />
            <span>Male</span>
          </div>
        </div>
        <div className="process-mini-gender__card">
          <div className="process-mini-gender__visual">
            <Image
              src="/media/process/gender-female.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 40vw, 180px"
              className="process-mini-gender__image"
              priority
            />
          </div>
          <div className="process-mini-gender__meta">
            <span className="process-mini-gender__dot" aria-hidden />
            <span>Female</span>
          </div>
        </div>
      </div>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewLocation() {
  return (
    <ProcessMiniScreen
      eyebrow="Athletic Wolf"
      title="Where will you train?"
    >
      <div className="process-mini-place-list">
        <div className="process-mini-place">
          <span className="process-mini-place__icon" aria-hidden>
            <House size={16} weight="bold" />
          </span>
          <div className="process-mini-place__copy">
            <p className="process-mini-place__label">Home</p>
            <p className="process-mini-place__hint">
              Bodyweight or minimal equipment
            </p>
          </div>
        </div>
        <div className="process-mini-place process-mini-place--selected">
          <span className="process-mini-place__icon" aria-hidden>
            <Buildings size={16} weight="bold" />
          </span>
          <div className="process-mini-place__copy">
            <p className="process-mini-place__label">Gym</p>
            <p className="process-mini-place__hint">
              Equipment and machines available
            </p>
          </div>
          <Check
            className="process-mini-place__check"
            size={16}
            weight="bold"
            aria-hidden
          />
        </div>
        <div className="process-mini-place">
          <span className="process-mini-place__icon" aria-hidden>
            <House size={16} weight="bold" />
          </span>
          <div className="process-mini-place__copy">
            <p className="process-mini-place__label">Home gym</p>
            <p className="process-mini-place__hint">Dedicated setup at home</p>
          </div>
        </div>
      </div>
    </ProcessMiniScreen>
  );
}
