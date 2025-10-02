// 환경변수(NEXT_PUBLIC_FACTORY_ADDRESS_<CHAIN_ID>) 우선, 없으면 기본값 사용
// 주의: Next.js는 빌드 타임 치환이므로 동적 키(`process.env["..."]`)는 동작하지 않음
const FACTORY_FROM_ENV: Partial<Record<number, `0x${string}` | undefined>> = {
	11155111: process.env.NEXT_PUBLIC_FACTORY_ADDRESS_11155111 as `0x${string}` | undefined,
	1: process.env.NEXT_PUBLIC_FACTORY_ADDRESS_1 as `0x${string}` | undefined,
};
const factoryFromEnv = (id: number) => FACTORY_FROM_ENV[id];

export const FACTORY_ADDRESS: Partial<Record<number, `0x${string}`>> = {
	11155111: "0xf165A010265372872fB3fC61CF96b130111BC581" as `0x${string}`,
	//11155111: factoryFromEnv(11155111) ?? "0xcAF4981135F1d7747ba55a76ACaFbeE4174AbD79",
	//1: factoryFromEnv(1) ?? "0x...메인넷_팩토리_주소(있다면)...",
};


// 환경변수 우선 -> 사전 정의 맵 순으로 조회
export function getFactoryAddress(id: number | undefined): `0x${string}` | undefined {
	if (!id) return undefined;
	const fromEnv = factoryFromEnv(id);
	if (fromEnv) return fromEnv;
	return FACTORY_ADDRESS[id];
}


