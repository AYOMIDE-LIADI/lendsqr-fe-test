import "./EmptyState.scss";

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {description && (
        <p className="empty-state__desc">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
