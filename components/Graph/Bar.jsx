import { ResponsiveBar } from '@nivo/bar'

export default function Bar({ datas, cur }) {
    // const amount = `amount`;
    const ValueOutside = ({ bars }) =>
        bars.map((bar) => {
            const {
                key,
                width,
                height,
                x,
                y,
                data: { value },
            } = bar
            return (
                <g key={key} transform={`translate(${x}, ${y})`}>
                    <text
                        transform={`translate(${width + 45}, ${height / 1.6})`}
                        textAnchor="middle"
                        fontSize="11px"
                    >
                        {cur} ${value}
                    </text>
                </g>
            )
        })
    return (
        <div className="h-[140px]">
            <ResponsiveBar
                width={440}
                height={140}
                data={datas}
                keys={['amount']}
                indexBy="day"
                margin={{ top: 0, right: 100, bottom: 0, left: 0 }}
                valueScale={{ type: 'linear' }}
                layout="horizontal"
                colors={datas.map((c) => c.color)}
                colorBy="index"
                enableLabel={false}
                animate={false}
                padding={0.15}
                axisTop={null}
                axisRight={null}
                axisLeft={null}
                axisBottom={null}
                enableGridY={false}
                role="application"
                tooltip={({ label, value }) => (
                    <span className="px-2 py-2 text-xs rounded-md bg-gray-50">
                        {label}:
                        <strong>
                            {' '}
                            <span>
                                {cur}$ {value}
                            </span>{' '}
                        </strong>
                    </span>
                )}
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    'markers',
                    'legends',
                    'annotations',
                    (props) => <ValueOutside {...props} />,
                ]}
            />
        </div>
    )
}
