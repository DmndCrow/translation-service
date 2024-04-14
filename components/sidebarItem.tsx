/* eslint-disable react/no-children-prop */
import { NestedObject, TranslationKey } from "@/lib/models";
import { useEffect, useState } from "react";

type Props = {
  isDefaultOpen: boolean;
  label: string;
  children: NestedObject;
};

const SidebarItem = ({ isDefaultOpen, label, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isDefaultOpen);
  }, [isDefaultOpen]);

  const hasChildren =
    children && Object.keys(children).length > 0 && !("__isLeaf" in children);

  const redirect = () => {
    window.location.href = `/translation/${children.id}`;
  };

  const isCompleted = (key: TranslationKey) => {
    const values = key.values?.filter((x) => +x.languageId !== 1);

    return values?.length === 2 && values.every((x) => x.value !== "");
  };

  return (
    <div>
      <div
        onClick={() => (hasChildren ? setIsOpen(!isOpen) : redirect())}
        style={{ cursor: "pointer" }}
      >
        {!hasChildren && (
          <>
            <input
              checked={isCompleted(children as unknown as TranslationKey)}
              onChange={(e) => {}}
              id="disabled-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            &nbsp;
          </>
        )}

        {label}

        {hasChildren && <span>{isOpen ? "▼" : "▶"}</span>}
      </div>
      {hasChildren && isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {Object.entries(children).map(([key, value]) => (
            <SidebarItem
              key={key}
              label={key}
              children={value as NestedObject}
              isDefaultOpen={isDefaultOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
