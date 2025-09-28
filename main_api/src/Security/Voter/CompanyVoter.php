<?php

namespace App\Security\Voter;

use ApiPlatform\Api\IriConverterInterface;
use App\Entity\User;
use App\Entity\Company;
use App\Entity\CoverImage;
use App\Entity\CompanyAccess;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class CompanyVoter extends Voter
{
    public const EDIT = 'COMPANY_EDIT';
    public const VIEW = 'COMPANY_VIEW';

    public function __construct(private IriConverterInterface $iriConverter) {
        
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
     
        return in_array($attribute, [self::EDIT, self::VIEW])
            && ($subject instanceof Company || $subject instanceof CoverImage || $subject instanceof CompanyAccess || $subject instanceof Request);
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
            self::EDIT => $this->canEdit($subject,$user),
            self::VIEW => true,
            default => throw new \LogicException('This code should not be reached!')
        };
    }
    private function canEdit(Company|CoverImage|Request $subject, User $user): bool
    {
        if($subject instanceof Request && $authorIri=$subject->request->get('author')){
            if(($company=$this->iriConverter->getResourceFromIri($authorIri)) instanceof Company){
                return $user === $company->getAuthor();
            }
        }
        if($subject instanceof CoverImage && ($company=$subject->getAuthor()) instanceof Company){
            return $user === $company->getAuthor();
        }

        return true;
    }
}
