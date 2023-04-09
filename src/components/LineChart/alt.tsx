import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area } from 'recharts'
import react, { Dispatch, SetStateAction, ReactNode } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { darken } from 'polished'

dayjs.extend(utc)


export type LineChartProps = {
  data: any[],
  color?: string | undefined,
  height?: number | undefined,
  minHeight?: number,
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for label of value
  value?: number
  label?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const Chart = ({
  data,
  color = "56B2A4",
  value,
  label,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  setLabel,
  setValue,
  height,
  minHeight = 300
}: LineChartProps) => {

  const parsedValue = value

  return(
    <div>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart 
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        onMouseLeave={() => {
          setLabel && setLabel(undefined)
          setValue && setValue(undefined)
        }}
        >
           <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darken(0.36, color)} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(time) => dayjs(time).format('DD')}
              minTickGap={10}
            />
            <Tooltip
              // cursor={{ stroke: theme.bg2 }}
              // contentStyle={{ display: 'none' }}
              // formatter={(value: number, name: string, props: { payload: { time: string; value: number } }) => {
              //   if (setValue && parsedValue !== props.payload.value) {
              //     setValue(props.payload.value)
              //   }
              //   const formattedTime = dayjs(props.payload.time).format('MMM D, YYYY')
              //   if (setLabel && label !== formattedTime) setLabel(formattedTime)
              // }}
            />
            <Area dataKey="value" type="monotone" stroke={color} fill="url(#gradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}