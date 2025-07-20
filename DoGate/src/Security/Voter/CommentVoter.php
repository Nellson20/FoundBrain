<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Entity\Author;
use App\Entity\Comment;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class CommentVoter extends Voter
{
    public const EDIT = 'COMMENT_EDIT';
    public const VIEW = 'COMMENT_VIEW';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [self::EDIT, self::VIEW])
            && $subject instanceof Comment;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        return match ($attribute) {
            self::EDIT => $this->canEdit($subject, $user),
            self::VIEW => true,
            default => throw new \LogicException('This code should not be reached!')
        };
    }
    private function canEdit(Comment $subject, User $user): bool
    {
        if ($subject instanceof Comment && ($author = $subject->getAuthor()) instanceof Author) {
            return $user === $author;
        }
        return false;
    }
}
