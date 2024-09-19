import ChartsContainer from '@/components/admin/chartsContainer';
import {
	ChartsLoadingContainer,
	StatsLoadingContainer,
} from '@/components/admin/loading';
import StatsContainer from '@/components/admin/statsContainer';
import { Suspense } from 'react';

function AdminPage() {
	return (
		<>
			<Suspense fallback={<StatsLoadingContainer />}>
				<StatsContainer />
			</Suspense>
			<Suspense fallback={<ChartsLoadingContainer />}>
				<ChartsContainer />
			</Suspense>
		</>
	);
}

export default AdminPage;
