/**
 * Haya Marriage Bureau - Admin Dashboard Logic
 */

import hayaDB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Security Check ---
    const user = hayaDB.getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    const queueBody = document.getElementById('verificationQueue');
    const statTotal = document.getElementById('statTotal');
    const statPending = document.getElementById('statPending');
    const statApproved = document.getElementById('statApproved');
    const statUsers = document.getElementById('statUsers');

    const refreshDashboard = () => {
        const allProfiles = JSON.parse(localStorage.getItem('haya_profiles')) || [];
        const allUsers = JSON.parse(localStorage.getItem('haya_users')) || [];
        const pendingProfiles = allProfiles.filter(p => p.status === 'pending');
        const approvedProfiles = allProfiles.filter(p => p.status === 'approved');

        // Update Stats
        if (statTotal) statTotal.textContent = allProfiles.length;
        if (statPending) statPending.textContent = pendingProfiles.length;
        if (statApproved) statApproved.textContent = approvedProfiles.length;
        if (statUsers) statUsers.textContent = allUsers.length;

        // Populate Queue
        if (queueBody) {
            queueBody.innerHTML = '';
            pendingProfiles.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${p.name}</strong><br><span style="font-size: 0.8rem; color: #777;">Age: ${p.age}</span></td>
                    <td>${p.city}</td>
                    <td>${p.education}</td>
                    <td><span class="status-badge" style="background: #ffcc00; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem;">${p.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn-approve" data-id="${p.id}" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Approve</button>
                        <button class="btn-reject" data-id="${p.id}" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Reject</button>
                    </td>
                `;
                queueBody.appendChild(tr);
            });
        }
    };

    // Event Delegation for Button Clicks
    if (queueBody) {
        queueBody.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            if (e.target.classList.contains('btn-approve')) {
                if (hayaDB.updateProfileStatus(id, 'approved')) {
                    refreshDashboard();
                }
            } else if (e.target.classList.contains('btn-reject')) {
                if (confirm('Are you sure you want to reject this profile?')) {
                    hayaDB.deleteProfile(id);
                    refreshDashboard();
                }
            }
        });
    }

    refreshDashboard();
});
