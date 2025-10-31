<?php
namespace App\Controller;

use App\Entity\UserAccountSettings;
use App\Enum\Sitelang;
use App\Entity\Pays;
use App\Entity\Desactivation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class AccountSettingsController extends AbstractController
{
    #[Route('/api/me/account-settings', name: 'update_account_settings', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        // Récupérer ou créer le settings
        $settings = $user->getAccountSettings();
        if (!$settings) {
            $settings = new UserAccountSettings();
            $settings->setUser($user);
            $settings->setLang(Sitelang::FR);
            // La cascade persist de User gère automatiquement la persistance
            $user->setAccountSettings($settings);
        }

        $data = json_decode($request->getContent(), true);

        
        if (isset($data['lang'])) {
            $langCode = strtoupper($data['lang']);
            if (in_array($langCode, ['FR', 'EN', 'MG'])) {
                $settings->setLang(Sitelang::from($langCode)); 
            }
        }

        $em->flush();

        return $this->json([
            'id' => $settings->getId(),
            'lang' => $settings->getLang()->name,
        ]);
    }

    #[Route('/api/me/account-desactivation', name: 'update_account_desactivation', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function updateDesactivation(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $timezone = new \DateTimeZone('Africa/Nairobi'); 
        $now = new \DateTimeImmutable('now', $timezone);

        $data = json_decode($request->getContent(), true);
        
        // Récupérer ou créer le settings
        $settings = $user->getAccountSettings();
        if (!$settings) {
            $settings = new UserAccountSettings();
            $settings->setUser($user);
            $settings->setLang(\App\Enum\Sitelang::FR); // Langue par défaut
            
            $user->setAccountSettings($settings);
        }

        // Mise à jour du statut actif
        if (isset($data['active'])) {
            $active = (bool)$data['active'];
            $settings->setActive($active);
            $desactivation = $em->getRepository(Desactivation::class)
                ->findOneBy(['user' => $user]);
            $deletedate = null;
            if ($desactivation) {
                $deletedate = $desactivation->getDeleteDate();
                $settings->setDeletedAt($deletedate);

            }
            // Si on désactive, enregistrer la date
            if (!$active) {
                $settings->setDisabledAt($now);
            }
        }

        $em->flush();

        return $this->json([
            'id' => $settings->getId(),
            'active' => $settings->isActive(),
            'disabledAt' => $settings->getDisabledAt() ? $settings->getDisabledAt()->format('Y-m-d H:i:s') : null,
            'deletedAt' => $settings->getDeletedAt() ? $settings->getDeletedAt()->format('Y-m-d H:i:s') : null,
        ]);
    }
    #[Route('/api/me/account-country', name: 'update_account_country', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function updateCountry(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        $settings = $user->getAccountSettings();
        if (!$settings) {
            $settings = new UserAccountSettings();
            $settings->setUser($user);
            $settings->setLang(\App\Enum\Sitelang::FR); // Langue par défaut
            
            $user->setAccountSettings($settings);
        }

        if (isset($data['country'])) {
        $country = $em->getRepository(\App\Entity\Pays::class)->find($data['country']);

        if (!$country) {
            return $this->json(['error' => 'Pays introuvable'], 404);
        }

            $settings->setCountry($country);
        }

        $em->flush();

        return $this->json([
        'id' => $settings->getId(),
        'country' => $settings->getCountry() ? $settings->getCountry()->getName() : null,
        ]);
    }
}
