// import { useEffect, useState } from "react";
// import axios from "axios";

// const Delete = () => {
//     useEffect(() => {
//         console.log("🔧 Delete component initialized");
//         console.log("🌐 API URL:", process.env.REACT_APP_API_DOMAIN);
        
//         const deleteUser = async () => {
//             console.log("🔄 Tentative de suppression des utilisateurs expirés...");
            
//             // Pour l'instant, on simule l'appel car l'API n'est pas accessible
//             // En production, vous devriez configurer un cron job pour exécuter:
//             // docker exec foundbrain-php-1 php bin/delete_expired_users.php
            
//             console.log("ℹ️ Note: L'API n'est pas accessible depuis le frontend.");
//             console.log("ℹ️ Pour supprimer les utilisateurs expirés, exécutez manuellement:");
//             console.log("ℹ️ docker exec foundbrain-php-1 php bin/delete_expired_users.php");
            
//             // Simulation d'un appel réussi
//             console.log("✅ Simulation: Suppression des utilisateurs expirés (toutes les 5 minutes)");
//         };

//         deleteUser(); // appel immédiat

//         const interval = setInterval(deleteUser, 5 * 60 * 1000); 
//         return () => {
//             console.log("🧹 Cleaning up interval");
//             clearInterval(interval);
//         };
//     }, []);

//     return null; 
// }
// export default Delete