import { cn } from '@/utils/cn';
import UserImage from '@/assets/images/user.webp';
import { reviewStyles } from '../styles/review';
import type { ReviewCardProps } from '../types';
import { StarIcon } from '@/lib';

export default function ReviewCard(props: ReviewCardProps) {
  const {
    title,
    description,
    author,
    role,
    userImageAlt = 'User Image',
    userImageSrc,
    rating = 5,
    size = 'md',
    className,
    ...rest
  } = props;

  const style = reviewStyles[size];
  const starsCount = Math.max(0, Math.min(5, Math.round(rating || 5)));

  return (
    <div className={cn(style.container, className)} {...rest}>
      <div className={`flex ${style.starsGap}`}>
        {[1, 2, 3, 4, 5].map((starId) => (
          <StarIcon
            key={starId}
            className={`${style.star} ${starId <= starsCount ? '' : 'opacity-30'}`}
          />
        ))}
      </div>

      <div>
        <h4 className={style.title}>{title}</h4>
        {description && <p className={style.description}>{description}</p>}
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <div>
          {author && <h4 className={style.author}>{author}</h4>}
          {role && <p className={style.role}>{role}</p>}
        </div>

        <img
          src={userImageSrc || UserImage}
          alt={userImageAlt}
          width={style.avatarSize.w}
          height={style.avatarSize.h}
          className={style.avatar}
        />
      </div>
    </div>
  );
}
